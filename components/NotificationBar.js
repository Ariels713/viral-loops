import { useState, useEffect } from 'react'
import styles from './NotificationBar.module.css'

export default function NotificationBar({ 
	targetDate = new Date('2025-08-16T23:59:59') // Default: August 16th, 2025 at midnight
}) {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		total: 0
	})

	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = new Date()
			const target = new Date(targetDate)
			const difference = target - now
			
			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24))
				const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
				const seconds = Math.floor((difference % (1000 * 60)) / 1000)
				
				return {
					days,
					hours,
					minutes,
					seconds,
					total: difference
				}
			}
			
			return {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				total: 0
			}
		}

		setTimeLeft(calculateTimeLeft())
		
		const timer = setInterval(() => {
			const newTimeLeft = calculateTimeLeft()
			setTimeLeft(newTimeLeft)
		}, 1000) // Update every second

		return () => clearInterval(timer)
	}, [targetDate])

	const getMessage = () => {
		const { days, hours, minutes, seconds } = timeLeft
		
		// Show concluded message when competition has ended
		if (timeLeft.total <= 0) {
			return "The Summer of Rho '25 competition has now concluded. Thanks for participating!"
		}
		
		if (days > 0) {
			return `Summer of Rho '25 ends in ${days} Days, ${minutes} Minutes and ${seconds} Seconds`
		} else if (hours > 0) {
			return `Summer of Rho '25 ends in ${hours} Hours, ${minutes} Minutes and ${seconds} Seconds`
		} else if (minutes > 0 || seconds > 0) {
			return `Summer of Rho '25 ends in ${minutes} Minutes and ${seconds} Seconds`
		} else {
			return "The Summer of Rho '25 competition has now concluded. Thanks for participating!"
		}
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