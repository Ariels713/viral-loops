import { useState, useEffect } from 'react'
import styles from './Leaderboard.module.css'

export default function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchLeaderboard()
	}, [])

	const fetchLeaderboard = async () => {
		try {
			setLoading(true)
			setError(null)
			
			const response = await fetch('/api/viral-loops', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()
			setLeaderboard(data.leaderboard || [])
			
			// Show a notice if using mock data
			if (data.mock) {
				// Demo mode - using mock data
			} else if (data.success) {
				// Live data loaded successfully
			}
			
		} catch (err) {
			console.error('Error fetching leaderboard:', err)
			setError('Failed to load leaderboard. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>🏆 Leaderboard</h2>
				</div>
				<div className={styles.loading}>Loading leaderboard...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>🏆 Leaderboard</h2>
				</div>
				<div className={styles.error}>{error}</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Leaderboard</h2>
				<p className={styles.subtitle}>Top referrers this month</p>
			</div>
			
			<div className={styles.leaderboard}>
				{leaderboard.map((entry) => (
					<div key={entry.id} className={styles.leaderboardItem}>
						<div className={styles.position}>
							{entry.position === 1 && '🥇'}
							{entry.position === 2 && '🥈'}
							{entry.position === 3 && '🥉'}
							{entry.position > 3 && `#${entry.position}`}
						</div>
						<div className={styles.name}>{entry.name}</div>
						<div className={styles.referrals}>
							{entry.referrals} referrals
						</div>
					</div>
				))}
			</div>

			{/* <div className={styles.footer}>
				<button className={styles.refreshButton} onClick={fetchLeaderboard}>
					Refresh
				</button>
			</div> */}
		</div>
	)
} 