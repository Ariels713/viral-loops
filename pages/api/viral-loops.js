// API handler for Viral Loops integration
// This will handle both leaderboard fetching and participant registration

export default async function handler(req, res) {
	const { method } = req
	const campaignId = process.env.NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID
	// Use the specific API token provided by Viral Loops for the participant search endpoint
	const apiToken = process.env.VIRAL_LOOPS_API_TOKEN

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
				console.log('🔄 Trying v3 API participant search endpoint...')
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
					console.log('⚠️ Rate limit detected (429), waiting before retry...')
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
					
					// The Viral Loops API returns data directly as an array, not wrapped in an object
					participants = Array.isArray(data) ? data : (data.data || data.participants || data.results || [])
					console.log('✅ Participant search success:', participants.length, 'participants')
					console.log('📊 API Response type:', Array.isArray(data) ? 'Array' : 'Object')
					
					// Log first participant structure for debugging
					if (participants.length > 0) {
						console.log('👤 First participant structure:', Object.keys(participants[0]))
						console.log('👤 First participant sample:', JSON.stringify(participants[0]).slice(0, 200))
					} else {
						console.log('⚠️ No participants found in response')
					}
				} else {
					const errorText = await response.text()
					console.log('❌ Participant search error:', response.status, errorText)
					console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()))
					throw new Error(`Participant search failed: ${response.status} - ${errorText}`)
				}

			} catch (searchError) {
				console.log('❌ Participant search failed:', searchError.message)
				
				// Fallback: Try the previous working endpoints
				try {
					// Fallback 1: Try participant data endpoint
					console.log('🔄 Falling back to v3 API participant data...')
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
						console.log('✅ Participant data fallback success:', participants.length, 'participants')
					} else {
						throw new Error(`Participant data fallback failed: ${response.status}`)
					}

				} catch (fallbackError) {
					console.log('❌ All API methods failed:', fallbackError.message)
					throw new Error('All API methods exhausted')
				}
			}
			
			// Transform the data to match our component structure
			// Sort participants by referral count in descending order
			const sortedParticipants = participants.sort((a, b) => {
				const aReferrals = a.referralCountTotal || a.referralsCount || a.referrals_count || a.referrals || a.totalReferrals || 0
				const bReferrals = b.referralCountTotal || b.referralsCount || b.referrals_count || b.referrals || b.totalReferrals || 0
				return bReferrals - aReferrals
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

				return {
					id: participant.id || participant._id || `participant_${index + 1}`,
					name,
					referrals,
					position: index + 1
				}
			})

			// Filter out participants with 0 referrals to show only active referrers
			const activeLeaderboard = leaderboard.filter(participant => participant.referrals > 0)

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

			try {
				// Use the correct Universal Referral campaign endpoint
				console.log('🔄 Trying Universal Referral campaign registration...')
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
					console.log('✅ Universal Referral registration success:', data)
				} else {
					const errorText = await response.text()
					console.log('Universal Referral registration error:', response.status, errorText)
					throw new Error(`Universal Referral registration failed: ${response.status}`)
				}

			} catch (registrationError) {
				console.log('❌ Universal Referral registration failed:', registrationError.message)
				throw new Error('Registration failed: ' + registrationError.message)
			}
			
			res.status(200).json({ 
				success: true, 
				data: {
					id: data.referralCode || 'new_participant',
					email: email,
					referralCode: data.referralCode,
					isNew: data.isNew,
					referralLink: `https://viral-loops.com/ref/${data.referralCode}` // Construct referral link
				},
				source: 'live_api'
			})

		} else {
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).json({ error: `Method ${method} not allowed` })
		}

	} catch (error) {
		console.error('Viral Loops API Error:', error.message)
		
		// For development, return mock data if API fails
		if (method === 'GET') {
			const mockLeaderboard = [
				{ id: 1, name: 'Alex R.', referrals: 47, position: 1 },
				{ id: 2, name: 'Jordan M.', referrals: 33, position: 2 },
				{ id: 3, name: 'Casey L.', referrals: 28, position: 3 },
				{ id: 4, name: 'Morgan K.', referrals: 19, position: 4 },
				{ id: 5, name: 'Taylor S.', referrals: 15, position: 5 },
				{ id: 6, name: 'Jamie P.', referrals: 12, position: 6 },
				{ id: 7, name: 'Avery D.', referrals: 8, position: 7 },
				{ id: 8, name: 'Quinn B.', referrals: 6, position: 8 }
			]
			
			res.status(200).json({ 
				leaderboard: mockLeaderboard,
				mock: true,
				note: 'Demo data - Configure API integration for live data'
			})
		} else {
			res.status(200).json({ 
				success: true, 
				mock: true,
				note: 'Demo mode - Configure API integration for live functionality',
				data: {
					id: 'demo_' + Date.now(),
					email: req.body.email,
					referralLink: 'https://your-campaign.viral-loops.com/ref/demo-link'
				}
			})
		}
	}
} 