// API handler for Viral Loops integration
// This will handle both leaderboard fetching and participant registration

// Function to send Slack notification
async function sendSlackNotification(userData) {
	const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
	
	if (!slackWebhookUrl) {
		console.log('Slack webhook URL not configured, skipping notification')
		return
	}

	const submissionDate = new Date().toLocaleDateString('en-US', {
		month: '2-digit',
		day: '2-digit'
	})

	const message = {
		text: "New Summer of Rho Registration! 🎉",
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `*New Summer of Rho Registration! 🎉*\n\n*Name:* ${userData.firstName} ${userData.lastName || ''}\n*Email:* ${userData.email}\n*Referral Code:* ${userData.referralCode}\n*Submission Date:* ${submissionDate}`
				}
			}
		]
	}

	try {
		const response = await fetch(slackWebhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		})

		if (!response.ok) {
			throw new Error(`Slack webhook failed: ${response.status}`)
		}

		console.log('Slack notification sent successfully')
	} catch (error) {
		console.error('Failed to send Slack notification:', error)
	}
}

export default async function handler(req, res) {
	const { method } = req
	const campaignId = process.env.NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID
	// Use the specific API token provided by Viral Loops for the participant search endpoint
	const apiToken = process.env.VIRAL_LOOPS_API_TOKEN
	const isTestingMode = process.env.VIRAL_LOOPS_TESTING_MODE === 'true'

	// Enable CORS
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

	if (method === 'OPTIONS') {
		res.status(200).end()
		return
	}

	try {
		if (method === 'GET') {
			// Use the new Viral Loops participant search endpoint
			let response, data, participants = []

			try {
				// Primary approach: Use the new participant search endpoint
				response = await fetch('https://app.viral-loops.com/api/v3/campaign/participant/search', {
					method: 'POST',
					headers: {
						'accept': 'application/json',
						'apiToken': apiToken,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						filters: {
							conversionStatus: "all",
							source: "all",
							searchTerm: ""
						},
						pagination: {
							offset: 0,
							limit: 10
						}
					})
				})

				// Check for rate limiting
				if (response.status === 429) {
					// Rate limit detected, wait before retry
					await new Promise(resolve => setTimeout(resolve, 2000))
					
					// Retry once
					response = await fetch('https://app.viral-loops.com/api/v3/campaign/participant/search', {
						method: 'POST',
						headers: {
							'accept': 'application/json',
							'apiToken': apiToken,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							filters: {
								conversionStatus: "all",
								source: "all",
								searchTerm: ""
							},
							pagination: {
								offset: 0,
								limit: 10
							}
						})
					})
				}

				if (response.ok) {
					data = await response.json()
					
					// Log the raw data from Viral Loops for debugging
					console.log('Raw Viral Loops data:', JSON.stringify(data, null, 2))
					
					// The Viral Loops API returns data directly as an array, not wrapped in an object
					participants = Array.isArray(data) ? data : (data.data || data.participants || data.results || [])
					
					// Log the processed participants array
					console.log('Processed participants:', JSON.stringify(participants.slice(0, 3), null, 2))
				} else {
					const errorText = await response.text()
					throw new Error(`Participant search failed: ${response.status} - ${errorText}`)
				}

			} catch (searchError) {
				// Fallback: Try the previous working endpoints
				try {
					// Fallback 1: Try participant data endpoint
					response = await fetch('https://app.viral-loops.com/api/v3/participant/data', {
						method: 'GET',
						headers: {
							'accept': 'application/json',
							'apiToken': apiToken
						}
					})

					if (response.ok) {
						data = await response.json()
						participants = data.data || data.participants || []
					} else {
						throw new Error(`Participant data fallback failed: ${response.status}`)
					}

				} catch (fallbackError) {
					throw new Error('All API methods exhausted')
				}
			}
			
			// Transform the data to match our component structure
			// Sort participants by successful referrals first, then by total referrals
			const sortedParticipants = participants.sort((a, b) => {
				const aSuccessful = a.successfulReferrals || a.conversionCountTotal || 0
				const bSuccessful = b.successfulReferrals || b.conversionCountTotal || 0
				
				// If successful referrals are equal, sort by total referrals
				if (aSuccessful === bSuccessful) {
					const aReferrals = a.referralCountTotal || a.referralsCount || a.referrals_count || a.referrals || a.totalReferrals || 0
					const bReferrals = b.referralCountTotal || b.referralsCount || b.referrals_count || b.referrals || b.totalReferrals || 0
					return bReferrals - aReferrals
				}
				
				return bSuccessful - aSuccessful
			})

			const leaderboard = sortedParticipants.slice(0, 10).map((participant, index) => {
				// Try different name combinations
				let name = 'Anonymous User'
				
				if (participant.firstname || participant.first_name) {
					const firstName = participant.firstname || participant.first_name
					const lastName = participant.lastname || participant.last_name || ''
					name = lastName ? `${firstName} ${lastName.charAt(0)}.` : firstName
				} else if (participant.name) {
					name = participant.name
				} else if (participant.email) {
					const emailUser = participant.email.split('@')[0]
					name = `${emailUser.charAt(0).toUpperCase()}${emailUser.slice(1)}`
				}

				// Try different referral count fields - prioritize referralCountTotal from Viral Loops
				const referrals = participant.referralCountTotal || 
					participant.referralsCount || 
					participant.referrals_count || 
					participant.referrals || 
					participant.totalReferrals || 
					participant.referral_count ||
					0

				// Get successful referrals - try multiple field names
				const successfulReferrals = participant.successfulReferrals || 
					participant.conversionCountTotal || 
					participant.conversions || 
					participant.successful_referrals ||
					0

				console.log(`Participant ${name}: Total referrals: ${referrals}, Successful referrals: ${successfulReferrals}`)

				return {
					id: participant.id || participant._id || `participant_${index + 1}`,
					name,
					referrals,
					successfulReferrals,
					position: index + 1
				}
			})

			// Filter out participants with 0 referrals to show only active referrers
			const activeLeaderboard = leaderboard.filter(participant => participant.referrals > 0)

			console.log('Final leaderboard data:', JSON.stringify(activeLeaderboard.slice(0, 3), null, 2))

			res.status(200).json({ 
				leaderboard: activeLeaderboard.length > 0 ? activeLeaderboard : leaderboard.slice(0, 8), 
				success: true,
				totalParticipants: participants.length,
				activeReferrers: activeLeaderboard.length,
				source: 'live_data'
			})

		} else if (method === 'POST') {
			// Try multiple registration approaches
			const { email, firstName, lastName } = req.body

			if (!email || !firstName) {
				return res.status(400).json({ 
					success: false, 
					error: 'Email and first name are required' 
				})
			}



			let response, data

			// Skip Viral Loops API call if in testing mode
			if (isTestingMode) {
				console.log('Testing mode enabled - skipping Viral Loops API call')
				const mockReferralCode = 'TEST' + Math.random().toString(36).substr(2, 6).toUpperCase()
				
				// Send Slack notification with referral code
				try {
					await sendSlackNotification({ email, firstName, lastName, referralCode: mockReferralCode })
				} catch (slackError) {
					console.error('Slack notification failed:', slackError)
					// Don't fail the registration if Slack fails
				}
				
				return res.status(200).json({ 
					success: true, 
					testing: true,
					data: {
						id: 'test_' + Date.now(),
						email: email,
						referralCode: mockReferralCode,
						isNew: true,
						referralLink: `https://www.rho.co/?utm_source=q3-referral-program&utm_source=summer-of-rho&referralCode=${mockReferralCode}`,
						participantData: {
							email: email,
							firstname: firstName,
							lastname: lastName || '',
							referralCode: mockReferralCode,
							rank: 0,
							referralCountTotal: 0,
							referredLeads: 0,
							xReferrals: 0
						}
					},
					source: 'testing_mode'
				})
			}

			try {
				// Use the correct Universal Referral campaign endpoint
				response = await fetch('https://app.viral-loops.com/api/v3/campaign/participant', {
					method: 'POST',
					headers: {
						'accept': 'application/json',
						'content-type': 'application/json'
					},
					body: JSON.stringify({
						user: {
							firstname: firstName,
							lastname: lastName || '',
							email: email
						},
						publicToken: campaignId
					})
				})

				if (response.ok) {
					data = await response.json()
				} else {
					const errorText = await response.text()
					throw new Error(`Universal Referral registration failed: ${response.status}`)
				}

			} catch (registrationError) {
				throw new Error('Registration failed: ' + registrationError.message)
			}

			// After successful registration, fetch participant data to get complete details
			let participantData = null
			try {
				const participantResponse = await fetch('https://app.viral-loops.com/api/v3/campaign/participant/data', {
					method: 'GET',
					headers: {
						'accept': 'application/json',
						'apiToken': apiToken
					}
				})

				if (participantResponse.ok) {
					participantData = await participantResponse.json()
				}
			} catch (participantError) {
				console.log('Could not fetch participant data:', participantError.message)
			}

			// Send Slack notification with referral code
			try {
				await sendSlackNotification({ email, firstName, lastName, referralCode: data.referralCode })
			} catch (slackError) {
				console.error('Slack notification failed:', slackError)
				// Don't fail the registration if Slack fails
			}
			
			res.status(200).json({ 
				success: true, 
				data: {
					id: data.referralCode || 'new_participant',
					email: email,
					referralCode: data.referralCode,
					isNew: data.isNew,
					referralLink: `https://www.rho.co/?utm_source=q3-referral-program&utm_source=summer-of-rho&referralCode=${data.referralCode}`,
					participantData: participantData // Include full participant data if available
				},
				source: 'live_api'
			})

		} else {
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).json({ error: `Method ${method} not allowed` })
		}

	} catch (error) {
		// Handle API errors gracefully
		
		// For development, return mock data if API fails
		if (method === 'GET') {
			const mockLeaderboard = [
				{ id: 1, name: 'Alex R.', referrals: 47, successfulReferrals: 12, position: 1 },
				{ id: 2, name: 'Jordan M.', referrals: 33, successfulReferrals: 8, position: 2 },
				{ id: 3, name: 'Casey L.', referrals: 28, successfulReferrals: 7, position: 3 },
				{ id: 4, name: 'Morgan K.', referrals: 19, successfulReferrals: 5, position: 4 },
				{ id: 5, name: 'Taylor S.', referrals: 15, successfulReferrals: 3, position: 5 },
				{ id: 6, name: 'Jamie P.', referrals: 12, successfulReferrals: 2, position: 6 },
				{ id: 7, name: 'Avery D.', referrals: 8, successfulReferrals: 1, position: 7 },
				{ id: 8, name: 'Quinn B.', referrals: 6, successfulReferrals: 1, position: 8 }
			]
			
			res.status(200).json({ 
				leaderboard: mockLeaderboard,
				mock: true,
				note: 'Demo data - Configure API integration for live data'
			})
		} else {
			const mockReferralCode = 'DEMO' + Math.random().toString(36).substr(2, 6).toUpperCase()
			
			// Send Slack notification for mock registration with referral code
			try {
				await sendSlackNotification({ 
					email: req.body.email, 
					firstName: req.body.firstName, 
					lastName: req.body.lastName,
					referralCode: mockReferralCode
				})
			} catch (slackError) {
				console.error('Slack notification failed:', slackError)
			}

			res.status(200).json({ 
				success: true, 
				mock: true,
				note: 'Demo mode - Configure API integration for live functionality',
				data: {
					id: 'demo_' + Date.now(),
					email: req.body.email,
					referralCode: mockReferralCode,
					referralLink: `https://www.rho.co/?utm_source=q3-referral-program&utm_source=summer-of-rho&referralCode=${mockReferralCode}`,
					participantData: {
						email: req.body.email,
						firstname: req.body.firstName,
						lastname: req.body.lastName || '',
						referralCode: mockReferralCode,
						rank: 0,
						referralCountTotal: 0,
						referredLeads: 0,
						xReferrals: 0
					}
				}
			})
		}
	}
} 