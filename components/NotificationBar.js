import { useState, useEffect } from 'react'
import styles from './NotificationBar.module.css'

export default function NotificationBar({ 
	targetDate = new Date('2025-08-16T23:59:59') // Default: August 16th, 2025 at midnight
}) {
	const [daysLeft, setDaysLeft] = useState(0)

	useEffect(() => {
		const calculateDaysLeft = () => {
			const now = new Date()
			const target = new Date(targetDate)
			const difference = target - now
			
			if (difference > 0) {
				// Calculate full days remaining (round up if there's any time left in the day)
				return Math.ceil(difference / (1000 * 60 * 60 * 24))
			}
			
			return 0
		}

		setDaysLeft(calculateDaysLeft())
		
		const timer = setInterval(() => {
			const newDaysLeft = calculateDaysLeft()
			setDaysLeft(newDaysLeft)
		}, 1000 * 60 * 60) // Update every hour

		return () => clearInterval(timer)
	}, [targetDate])

	const getMessage = () => {
		if (daysLeft === 1) {
			return "Last Day to get your referrals in to win $100k!"
		} else if (daysLeft > 1) {
			return `Only ${daysLeft} Days to win $100k!`
		} else {
			return "Contest has ended"
		}
	}

	// Don't render if contest has ended
	if (daysLeft === 0) {
		return null
	}

	return (
		<div className={styles.notificationBar}>
			<div className={styles.content}>
				<div className={styles.message}>
					<span className={styles.messageText}>{getMessage()}</span>
				</div>
			</div>
		</div>
	)
} 