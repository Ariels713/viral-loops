import Head from "next/head";
import Image from "next/image";
import ViralLoopsLeaderboard from '../components/ViralLoopsLeaderboard'
import ViralLoopsForm from '../components/ViralLoopsForm'
import styles from "@/styles/Home.module.css";

export default function Home() {
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
            
            {/* Video Placeholder */}
            <div className={styles.videoContainer}>
              <div className={styles.videoPlaceholder}>
                <div className={styles.playButton}>▶</div>
                <p className={styles.videoText}>Campaign Overview Video</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className={styles.howItWorksSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>How to participate & start earning rewards today</h2>
              <p className={styles.sectionSubtitle}>
                From July to August 15th, earn more rewards for every qualified business you refer to Rho. Terms and conditions apply.
              </p>
            </div>

            <div className={styles.steps}>
              {/* Step 1 */}
              <div className={styles.step}>
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
                <div className={styles.stepImage}>
                  <Image
                    src="/images/step-1-get-referral-link.png"
                    alt="Get your unique referral link"
                    width={300}
                    height={200}
                    className={styles.stepIllustration}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className={styles.step}>
                <div className={styles.stepNumber}>02.</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Earn $1,000 for every qualifying business you refer</h3>
                  <p className={styles.stepDescription}>
                    For every qualifying business that signs up through your link, you earn $1,000, and they earn $1,000 too.
                  </p>
                </div>
                <div className={styles.stepImage}>
                  <Image
                    src="/images/step-2-earn-rewards.png"
                    alt="Earn $1,000 for every qualifying business"
                    width={300}
                    height={200}
                    className={styles.stepIllustration}
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className={styles.step}>
                <div className={styles.stepNumber}>03.</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Compete for the $100,000 Grand Prize</h3>
                  <p className={styles.stepDescription}>
                    The person or business that refers the most qualifying startups wins the $100,000 grand prize. Second place gets $25,000 to put toward an off-site experience for your team.
                  </p>
                </div>
                <div className={styles.stepImage}>
                  <Image
                    src="/images/step-3-grand-prize.png"
                    alt="Compete for the $100,000 Grand Prize"
                    width={300}
                    height={200}
                    className={styles.stepIllustration}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Widgets Section */}
          <div className={styles.widgetsSection} id="signup-form">
            <div className={styles.widgets}>
              <div className={styles.widget}>
                <ViralLoopsLeaderboard />
              </div>
              
              <div className={styles.widget}>
                <ViralLoopsForm />
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
