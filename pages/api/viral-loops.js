// API handler for Viral Loops integration
// This will handle both leaderboard fetching and participant registration

export default async function handler(req, res) {
	const { method } = req
	const campaignId = process.env.NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID
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
			// Fetch leaderboard data
			const response = await fetch(`https://app.viral-loops.com/api/v2/campaigns/${campaignId}/leaderboard`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error(`Viral Loops API error: ${response.status}`)
			}

			const data = await response.json()
			
			// Transform the data to match our component structure
			const leaderboard = data.participants?.slice(0, 10).map((participant, index) => ({
				id: participant.id || index + 1,
				name: participant.referrer_id || `User ${index + 1}`,
				referrals: participant.referrals_count || 0,
				position: index + 1
			})) || []

			res.status(200).json({ leaderboard })

		} else if (method === 'POST') {
			// Register new participant
			const { email, firstName, lastName } = req.body

			if (!email || !firstName) {
				return res.status(400).json({ 
					success: false, 
					error: 'Email and first name are required' 
				})
			}

			const response = await fetch(`https://app.viral-loops.com/api/v2/campaigns/${campaignId}/participants`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					participant: {
						email,
						firstname: firstName,
						lastname: lastName || '',
						referrer_id: email // Using email as referrer_id for simplicity
					}
				})
			})

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				throw new Error(errorData.message || `Viral Loops API error: ${response.status}`)
			}

			const data = await response.json()
			
			res.status(200).json({ 
				success: true, 
				data: {
					id: data.participant?.id,
					email: data.participant?.email,
					referralLink: data.participant?.referral_link
				}
			})

		} else {
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).json({ error: `Method ${method} not allowed` })
		}

	} catch (error) {
		console.error('Viral Loops API Error:', error)
		
		// For development, return mock data if API fails
		if (method === 'GET') {
			const mockLeaderboard = [
				{ id: 1, name: 'John D.', referrals: 25, position: 1 },
				{ id: 2, name: 'Sarah M.', referrals: 22, position: 2 },
				{ id: 3, name: 'Mike R.', referrals: 18, position: 3 },
				{ id: 4, name: 'Emma L.', referrals: 15, position: 4 },
				{ id: 5, name: 'David K.', referrals: 12, position: 5 }
			]
			
			res.status(200).json({ 
				leaderboard: mockLeaderboard,
				mock: true,
				error: 'Using mock data - API integration pending'
			})
		} else {
			res.status(200).json({ 
				success: true, 
				mock: true,
				error: 'Using mock response - API integration pending'
			})
		}
	}
} 