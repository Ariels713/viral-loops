import { useState } from 'react'
import styles from './ViralLoopsForm.module.css'

export default function ViralLoopsForm() {
	const [formData, setFormData] = useState({
		email: '',
		firstName: '',
		lastName: ''
	})
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(null)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
		// Clear errors when user starts typing
		if (error) setError(null)
	}

	const validateForm = () => {
		if (!formData.email) {
			setError('Email is required')
			return false
		}
		if (!formData.email.includes('@')) {
			setError('Please enter a valid email address')
			return false
		}
		if (!formData.firstName) {
			setError('First name is required')
			return false
		}
		return true
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		if (!validateForm()) return

		try {
			setLoading(true)
			setError(null)

			const response = await fetch('/api/viral-loops', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: formData.email,
					firstName: formData.firstName,
					lastName: formData.lastName
				})
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()
			
			if (data.success) {
				setSuccess(true)
				setFormData({ email: '', firstName: '', lastName: '' })
				
				// Show referral link if available
				if (data.data?.referralLink) {
					console.log('🔗 Your referral link:', data.data.referralLink)
				}
				
				// Show notice if using mock data
				if (data.mock) {
					console.log('📝 Demo Mode:', data.note)
				} else {
					console.log('✅ Successfully registered with Viral Loops!')
				}
				
				// Reset success message after 3 seconds
				setTimeout(() => setSuccess(false), 3000)
			} else {
				setError(data.error || 'Failed to join referral program')
			}

		} catch (err) {
			console.error('Error submitting form:', err)
			setError('Failed to join referral program. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	if (success) {
		return (
			<div className={styles.container}>
				<div className={styles.success}>
					<div className={styles.successIcon}>🎉</div>
					<h3 className={styles.successTitle}>Welcome to our referral program!</h3>
					<p className={styles.successMessage}>
						You've been successfully registered. Start sharing your referral link to earn rewards!
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>🚀 Join Our Referral Program</h2>
				<p className={styles.subtitle}>
					Refer friends and earn amazing rewards for every successful referral!
				</p>
			</div>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="firstName" className={styles.label}>
						First Name *
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						className={styles.input}
						placeholder="Enter your first name"
						disabled={loading}
					/>
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor="lastName" className={styles.label}>
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleInputChange}
						className={styles.input}
						placeholder="Enter your last name"
						disabled={loading}
					/>
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor="email" className={styles.label}>
						Email Address *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className={styles.input}
						placeholder="Enter your email address"
						disabled={loading}
					/>
				</div>

				{error && (
					<div className={styles.error}>
						{error}
					</div>
				)}

				<button 
					type="submit" 
					className={styles.submitButton}
					disabled={loading}
				>
					{loading ? (
						<>
							<span className={styles.spinner}></span>
							Joining...
						</>
					) : (
						'Join Referral Program'
					)}
				</button>
			</form>

			<div className={styles.footer}>
				<p className={styles.footerText}>
					By joining, you agree to our terms and conditions.
				</p>
			</div>
		</div>
	)
} 