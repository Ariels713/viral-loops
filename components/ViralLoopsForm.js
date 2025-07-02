import { useState, useEffect } from 'react'
import styles from './ViralLoopsForm.module.css'

export default function ViralLoopsForm() {
	const [formData, setFormData] = useState({
		email: '',
		firstName: '',
		lastName: ''
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [registrationData, setRegistrationData] = useState(null)
	const [showForm, setShowForm] = useState(true)

	// Check localStorage on component mount
	useEffect(() => {
		const savedRegistration = localStorage.getItem('viralLoopsRegistration')
		if (savedRegistration) {
			try {
				const parsedData = JSON.parse(savedRegistration)
				setRegistrationData(parsedData)
				setShowForm(false)
			} catch (err) {
				console.error('Error parsing saved registration data:', err)
				localStorage.removeItem('viralLoopsRegistration')
			}
		}
	}, [])

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
				// Store registration data in localStorage
				const registrationInfo = {
					email: formData.email,
					firstName: formData.firstName,
					lastName: formData.lastName,
					referralCode: data.data.referralCode,
					referralLink: data.data.referralLink,
					participantData: data.data.participantData,
					registrationDate: new Date().toISOString(),
					isMock: data.mock || false
				}
				
				localStorage.setItem('viralLoopsRegistration', JSON.stringify(registrationInfo))
				setRegistrationData(registrationInfo)
				setShowForm(false)
				setFormData({ email: '', firstName: '', lastName: '' })
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

	const handleNewRegistration = () => {
		localStorage.removeItem('viralLoopsRegistration')
		setRegistrationData(null)
		setShowForm(true)
		setFormData({ email: '', firstName: '', lastName: '' })
		setError(null)
	}

	const copyToClipboard = async (text) => {
		try {
			await navigator.clipboard.writeText(text)
			// You could add a toast notification here
		} catch (err) {
			console.error('Failed to copy to clipboard:', err)
		}
	}

	// Show referral code if user has already registered
	if (!showForm && registrationData) {
		return (
			<div className={styles.container}>
				{/* <div className={styles.header}>
					<h2 className={styles.title}>Your Referral Code</h2>
					<p className={styles.subtitle}>
						Share your referral code to earn rewards!
					</p>
				</div> */}

				<div className={styles.referralDisplay}>
					<div className={styles.welcomeMessage}>
						<h2 className={styles.welcomeTitle}>
							Welcome, {registrationData.firstName}!
						</h2>
						<p className={styles.welcomeText}>
							You're all set up in our referral program.
						</p>
					</div>

					<div className={styles.referralCodeContainer}>
						<label className={styles.label}>Your Referral Code</label>
						<div className={styles.codeDisplay}>
							<code className={styles.referralCode}>
								{registrationData.referralCode}
							</code>
							<button 
								onClick={() => copyToClipboard(registrationData.referralCode)}
								className={styles.copyButton}
								title="Copy to clipboard"
							>
								Copy
							</button>
						</div>
					</div>

					<div className={styles.referralLinkContainer}>
						<label className={styles.label}>Your Referral Link</label>
						<div className={styles.linkDisplay}>
							<input 
								type="text" 
								value={registrationData.referralLink} 
								readOnly 
								className={styles.linkInput}
							/>
							<button 
								onClick={() => copyToClipboard(registrationData.referralLink)}
								className={styles.copyButton}
								title="Copy to clipboard"
							>
								Copy
							</button>
						</div>
					</div>

					{registrationData.participantData && (
						<div className={styles.statsContainer}>
							<h4 className={styles.statsTitle}>Your Progress</h4>
							<div className={styles.statsGrid}>
								<div className={styles.statItem}>
									<span className={styles.statLabel}>Total Referrals</span>
									<span className={styles.statValue}>
										{registrationData.participantData.referralCountTotal || 0}
									</span>
								</div>
								<div className={styles.statItem}>
									<span className={styles.statLabel}>Current Rank</span>
									<span className={styles.statValue}>
										#{registrationData.participantData.rank || 'Unranked'}
									</span>
								</div>
							</div>
						</div>
					)}

					{registrationData.isMock && (
						<div className={styles.demoNotice}>
							<p>🚧 Demo Mode - This is sample data for testing purposes</p>
						</div>
					)}
				</div>

				<div className={styles.footer}>
					<button 
						onClick={handleNewRegistration}
						className={styles.resetButton}
					>
						Register Different Email
					</button>
					<p className={styles.footerText}>
						Registered on {new Date(registrationData.registrationDate).toLocaleDateString()}
					</p>
				</div>
			</div>
		)
	}

	// Show registration form
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Join Our Referral Program</h2>
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