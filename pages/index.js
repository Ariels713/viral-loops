import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ViralLoopsLeaderboard from '../components/ViralLoopsLeaderboard'
import ViralLoopsForm from '../components/ViralLoopsForm'
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I sign up for Summer of Rho?",
      answer: (
        <div>
          <p>Signing up is quick and easy.</p>
          <ol>
            <li>Go to <a href="#signup-form" className={styles.faqLink}>summerofrho.com</a></li>
            <li>Fill out a short form with your first name, last name, and email</li>
            <li>You'll receive a unique referral link to share with startups</li>
            <li>Any startup that applies through your link will be automatically tracked.</li>
          </ol>
        </div>
      )
    },
    {
      question: "What counts as a qualified Summer of Rho referral?",
      answer: (
        <div>
          <p>A referral is considered qualified for the Summer of Rho competition if the referred startup applies for and opens a Rho account, and maintains an average daily balance of $350,000 for 90 days from the account opening date. Once these criteria are met, your referral count on the leaderboard will increase by one.</p>
          <p>However, eligibility is contingent on the referred company sustaining that $350,000 average daily balance throughout the 90-day verification period. If the balance falls below that amount at any point during this time, the referral will no longer qualify, and the $1,000 payout will not be awarded.</p>
          <p>All referrals will be audited after the competition ends. Rho reserves the right to adjust leaderboard totals and payout amounts based on the final verification. It's important to note that the leaderboard is intended for informational purposes only and will not serve as the official count for determining the Grand Prize and Second Prize winners.</p>
          <p>Additionally, only referrals submitted on or after July 2, 2025, and before the end of the contest will be considered for the Summer of Rho competition.</p>
        </div>
      )
    },
    {
      question: "Who is eligible to participate in Summer of Rho?",
      answer: (
        <div>
          <p>To be eligible to participate in the Summer of Rho competition and qualify for prizes, you must refer a minimum number of qualified startups. Specifically, you need to refer at least 10 qualified startups to be eligible for the Grand Prize, and at least 5 to be eligible for the Second Prize.</p>
          <p>There is a limit on how many referrals can be counted per UBO (ultimate beneficial owner). Only two referred startups per UBO will count toward your qualified referral total. In the case of a tie for first place, the participant whose referrals bring in the most total deposits will win.</p>
          <p>The Summer of Rho competition may be combined with other offers or promotions organized by Rho, as long as you meet the terms and conditions of those additional programs.</p>
        </div>
      )
    },
    {
      question: "When can I expect this to payout?",
      answer: (
        <div>
          <p>All referral payouts for the Summer of Rho, including the final tallies for the Grand Prize and the Second Prize, are subject to a 90-day balance verification period. Each referred company must maintain an average daily balance of $350,000 throughout this period in order to qualify.</p>
          <p>Once the 90-day requirement is met and verified, the $1,000 referral bonuses will be paid out promptly. If a referred company's balance drops below $350,000 at any point during the verification period, that referral will no longer qualify for the payout or count toward your progress toward the Grand Prize or Second Prize.</p>
          <p>Leaderboard rankings are updated weekly for informational purposes, but they're preliminary and subject to change. Final rankings and payouts will be determined after a full audit at the end of the competition.</p>
        </div>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>Summer of Rho 2025 - Referral Program</title>
        <meta name="description" content="The easiest $100K your startup could make. Join the Summer of Rho 2025 referral program!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.content}>
              <div className={styles.logoContainer}>
                <Image
                  src="/images/summer-of-rho-2025.png"
                  alt="Summer of Rho 2025 - Referral Program"
                  width={600}
                  height={300}
                  className={styles.heroImage}
                  priority
                />
              </div>

              <h2 className={styles.headline}>
                The easiest $100K your startup could make.
              </h2>

              <p className={styles.subheadline}>
                Starting in July, earn $1000 for every qualified business you refer to Rho -
                and compete for the $100,000 Grand Prize. Terms and conditions apply.*
              </p>

              {/* Video Player */}
              <div className={styles.videoContainer}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src="https://player.vimeo.com/video/1092148967?h=b9e5775b90&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                    width="640"
                    height="360"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title="The Father of Accounting (Apologizes…500 Years Later) | Rho"
                    className={styles.videoIframe}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className={styles.howItWorksSection}>
            <div className={styles.howitworksContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>How to participate & start earning rewards today</h2>
                <p className={styles.sectionSubtitle}>
                  From July to August 15th, earn more rewards for every qualified business you refer to Rho. Terms and conditions apply.
                </p>
              </div>
              {/* add a divider */}
              <div className={styles.divider}></div>
              <div className={styles.steps}>
                {/* Step 1 */}
                <div className={styles.step}>
                  <div className={styles.stepContent}>
                    <div className={styles.stepNumber}>01.</div>
                    <div className={styles.stepContent}>
                      <h3 className={styles.stepTitle}>Get your unique referral link</h3>
                      <p className={styles.stepDescription}>
                        Sign up using the form below, entering your name and email address. You will then receive a unique referral URL. Every qualified referral that opens a Rho Account using that link will count toward your leaderboard score.
                      </p>
                      <button className={styles.getUrlButton} onClick={() => document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' })}>
                        Get URL
                      </button>
                    </div>
                  </div>

                  <div className={styles.stepImage}>
                    <Image
                      src="/images/step-1-get-referral-link.png"
                      alt="Get your unique referral link"
                      width={400}
                      height={400}
                      className={styles.stepIllustration}
                    />
                  </div>
                </div>
                <div className={styles.divider}></div>
                {/* Step 2 */}
                <div className={styles.step}>
                  <div className={styles.stepContent}>
                    <div className={styles.stepNumber}>02.</div>
                    <h3 className={styles.stepTitle}>Earn $1,000 for every qualifying business you refer</h3>
                    <p className={styles.stepDescription}>
                      For every qualifying business that signs up through your link, you earn $1,000, and they earn $1,000 too.
                    </p>
                  </div>
                  <div className={styles.stepImage}>
                    <Image
                      src="/images/step-2-earn-rewards.png"
                      alt="Earn $1,000 for every qualifying business"
                      width={400}
                      height={400}
                      className={styles.stepIllustration}
                    />
                  </div>
                </div>
                <div className={styles.divider}></div>
                {/* Step 3 */}
                <div className={styles.step}>
                  <div className={styles.stepContent}>
                    <div className={styles.stepNumber}>03.</div>
                    <h3 className={styles.stepTitle}>Compete for the $100,000 Grand Prize</h3>
                    <p className={styles.stepDescription}>
                      The person or business that refers the most qualifying startups wins the $100,000 grand prize. Second place gets $25,000 to put toward an off-site experience for your team.
                    </p>
                  </div>
                  <div className={styles.stepImage}>
                    <Image
                      src="/images/step-3-grand-prize.png"
                      alt="Compete for the $100,000 Grand Prize"
                      width={400}
                      height={400}
                      className={styles.stepIllustration}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Widgets Section */}
          <div className={styles.widgetsSection} id="signup-form">
            <div className={styles.widgets}>
              <div className={styles.widget}>
                <ViralLoopsForm />
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className={styles.leaderboardSection}>
            <div className={styles.leaderboardContainer}>
              <div className={styles.leaderboardHeader}>
                <h2 className={styles.leaderboardTitle}>Summer of Rho Leaderboard</h2>
                <p className={styles.leaderboardSubtitle}>
                  Compete for the $100K Grand Prize.
                </p>
              </div>
              <div className={styles.leaderboardWidget}>
                <ViralLoopsLeaderboard />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection}>
            <div className={styles.faqContainer}>
              <div className={styles.faqHeader}>
                <h2 className={styles.faqTitle}>FAQ: Summer of Rho</h2>
                <p className={styles.faqSubtitle}>
                  Learn more about the competition and how to qualify below.
                </p>
              </div>

              <div className={styles.faqList}>
                {faqData.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaq === index}
                    >
                      <span>{faq.question}</span>
                      <span className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ''}`}>
                        ▼
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className={styles.faqAnswer}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.howItWorksSection}>
                <div className={styles.howitworksContent}>
                  <div className={styles.steps}>
                    <div className={styles.step}>
                      <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>Have other questions about Summer of Rho?</h3>
                        <button className={styles.getUrlButton} onClick={() => window.location.href = 'mailto:summerofrho@rho.co?subject=Summer%20of%20Rho%20competition%20question'}>
                          Contact Us
                        </button>
                      </div>
                      <div className={styles.stepImage}>
                        <Image
                          src="/images/sign-up.png"
                          alt="Get your unique referral link"
                          width={400}
                          height={400}
                          className={styles.stepIllustration}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </main>

        <footer className={styles.footer}>
          <p>Powered by Viral Loops • Built with Next.js</p>
        </footer>
      </div>
    </>
  );
}
