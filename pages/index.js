import Head from "next/head";
import ViralLoopsLeaderboard from '../components/viralloopsleaderboard'
import ViralLoopsForm from '../components/ViralLoopsForm'
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Viral Loops Widgets - Referral Program</title>
        <meta name="description" content="Join our referral program and see who's leading the leaderboard!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>🎯 Viral Loops Referral Program</h1>
            <p className={styles.description}>
              Join our referral program and compete with others to earn amazing rewards!
            </p>
          </div>

          <div className={styles.widgets}>
            <div className={styles.widget}>
              <ViralLoopsLeaderboard />
            </div>
            
            <div className={styles.widget}>
              <ViralLoopsForm />
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
