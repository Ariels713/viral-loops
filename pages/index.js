import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Leaderboard from '~/components/Leaderboard'
import ViralLoopsForm from '~/components/ViralLoopsForm.js'
import styles from "@/styles/Home.module.css";
import NotificationBar from "@/components/NotificationBar";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const contestEndDate = new Date('2025-08-16T23:59:59');
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
        <title>Summer of Rho: Compete for $100K</title>
        <meta name="description" content="The easiest $100K your startup could make. Join the Summer of Rho: Compete for $100K" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/sunset.png" />

        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content="Summer of Rho: Compete for $100K" />
        <meta property="og:description" content="The easiest $100K your startup could make. Join the Summer of Rho: Compete for $100K" />
        <meta property="og:image" content="/images/meta_gif.gif" />
        <meta property="og:image:type" content="image/gif" />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="270" />
        <meta property="og:url" content="/" />
        <meta property="og:site_name" content="Summer of Rho: Compete for $100K" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Summer of Rho: Compete for $100K" />
        <meta name="twitter:description" content="The easiest $100K your startup could make. Join the Summer of Rho: Compete for $100K" />
        <meta name="twitter:image" content="/images/meta_gif.gif" />

        {/* Additional meta tags for better compatibility */}
        <meta property="og:image:alt" content="Summer of Rho: Compete for $100K animation" />
      </Head>
      <div className={styles.page}>
        <NotificationBar
          targetDate={contestEndDate}
        />
        <main className={styles.main}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.content}>
              <div className={styles.logoContainer}>
                <Image
                  src="/images/summer-of-rho-2025.png"
                  alt="Summer of Rho 2025"
                  width={600}
                  height={300}
                  className={styles.heroImage}
                  priority
                />
              </div>

              <h2 className={styles.headline}>
                Refer startups to Rho. It could win you $100K.
              </h2>

              <p className={styles.subheadline}>
                Refer a qualified startup to Rho. You get $1,000. They get $1,000. Refer the most before August 15th, you win $100,000. Terms and conditions apply.
              </p>
              <button className={`${styles.getUrlButton} ${styles.heroCTA}`} onClick={() => document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' })}>
                Get Your Link
              </button>
              {/* Video Player */}
              {/* <div className={styles.videoContainer}>
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
              </div> */}
            </div>
          </div>

          {/* How It Works Section */}
          <div className={styles.howItWorksSection}>
            <div className={styles.howitworksContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>How to participate & start earning rewards today</h2>
                <p className={styles.sectionSubtitle}>
                  For every qualifying business that signs up through your link, you earn $1,000, and they earn $1,000 too.
                </p>
              </div>
              {/* add a divider */}
              <div className={styles.divider}></div>
              <div className={styles.steps}>
                {/* Step 1 */}
                <div className={styles.step}>
                  <div className={styles.stepContent}>
                    <div className={styles.stepNumberContent}>
                      <div className={styles.stepNumber}>01.</div>
                      <h3 className={styles.stepTitle}>Get your unique referral link</h3>
                    </div>
                    <div className={styles.stepContent}>
                      <p className={styles.stepDescription}>
                        Sign up using the form below, entering your name and email address. You will then receive a unique referral URL. Every qualified referral that opens a Rho Account using that link will count toward your leaderboard score.
                      </p>
                      <button className={styles.getUrlButton} onClick={() => document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' })}>
                        Get Your Link
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
                    <div className={styles.stepNumberContent}>
                      <div className={styles.stepNumber}>02.</div>
                      <h3 className={styles.stepTitle}>Earn $1,000 for every qualifying business you refer</h3>
                    </div>
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
                    <div className={styles.stepNumberContent}>
                      <div className={styles.stepNumber}>03.</div>
                      <h3 className={styles.stepTitle}>Compete for the $100,000 Grand Prize</h3>
                    </div>
                    <p className={styles.stepDescription}>
                      The person or business that refers the most qualifying startups wins the $100,000 Grand Prize. Second place gets $25,000 to put toward an off-site experience for your team.
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
                <Leaderboard />
              </div>
            </div>
          </div>

          <div className={styles.howItWorksSection}>
            <div className={styles.howitworksContent}>
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>Have other questions about Summer of Rho?</h3>
                    <button className={styles.getUrlButton} onClick={() => window.location.href = 'mailto:summerofrho@rho.co?subject=Summer%20of%20Rho%20competition%'}>
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


        </main>

        <footer className={styles.footer}>
          <div className={styles.disclaimer}>
            <div className={styles.disclaimerContent}>
              <h3 className={styles.disclaimerTitle}>SUMMER OF RHO '25 REFERRAL CONTEST - Official Rules</h3>
              <p className={styles.disclaimerText}>
                <strong>NO PURCHASE NECESSARY TO ENTER OR WIN. A PURCHASE OR PAYMENT WILL NOT INCREASE YOUR CHANCES OF WINNING. VOID WHERE PROHIBITED.</strong>
              </p>
              <p className={styles.disclaimerText}>
                These Official Rules ("Rules") govern the Summer of Rho '25 Referral Contest ("Contest"), created and sponsored by Under Technologies, Inc., DBA Rho Technologies, with a principal place of business at 100 Crosby Street, New York, NY 10012 ("Sponsor").
              </p>
              <h4 className={styles.disclaimerSubtitle}>1. Eligibility</h4>
              <p className={styles.disclaimerText}>
                Entry into the Contest is open only to employees or authorized personnel of legal entities that are verified as startups by Sponsor and have successfully completed Sponsor's Know Your Customer verification process. In determining whether a legal entity qualifies as a startup, Sponsor will evaluate factors including, but not limited to, the entity's age, revenue, and funding status, at Sponsor's sole discretion. Employees or authorized personnel of legal entities must be legal residents of the fifty (50) States of the United States of America and the District of Columbia who are at least twenty-one (21) years of age at the time of entry. Eligible legal entities must also be based in the United States of America. The prizes for this Contest are limited to each qualifying legal entity (i.e., even if the business has multiple business owners, the owners may not separately apply for and receive multiple prizes), including all subsidiaries, affiliates, and related entities. Employees, officers, and directors of Sponsor, its affiliates, subsidiaries, advertising and promotion agencies, consultants and agents, as well as immediate family members or members of the same household of any such person, and any other third parties engaged in the development, production, operation, execution, design, advertising, promotion or distribution of this Contest (collectively the "Contest Entities") are not eligible to enter or win. The Contest is subject to all applicable federal, state, and local laws and regulations and is void where prohibited by law.
              </p>
              <h4 className={styles.disclaimerSubtitle}>2. Agreement to Official Rules</h4>
              <p className={styles.disclaimerText}>
                By participating in the Contest, the entrant fully and unconditionally agrees to and accepts these Rules and the decisions of the Sponsor and Contest Entities (if applicable), which are final and binding in all matters related to the Contest. By claiming and accepting a prize, the entrant also fully and unconditionally agrees to and accepts these Rules and the decisions of the Sponsor and Contest Entities (if applicable), which are final and binding in all matters related to the Contest.
              </p>
              <h4 className={styles.disclaimerSubtitle}>3. Contest Period</h4>
              <p className={styles.disclaimerText}>
                The period to submit referral submissions will begin on July 2, 2025, at 3:00pm (Eastern Time) and will end on August 16, 2025, at 11:59pm (Eastern Time) ("Contest Period"). Sponsor's computer is the official timekeeping device. Depending on Sponsor's determination of eligibility, prizes may be awarded after the conclusion of the Contest Period at Sponsor's sole discretion.
              </p>
              <h4 className={styles.disclaimerSubtitle}>4. How to Enter</h4>
              <div className={styles.disclaimerText}>
                <p className={styles.disclaimerText}>
                  There is no purchase necessary to participate. The usage of the Sponsor's services and products will not increase the chances of winning.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>Submission:</strong> Entrants that are eligible for this Contest can sign up for the Contest using the Contest's landing page at summerofrho.com. Entrants will then be provided a custom online link that they can send to other U.S.-based corporate entities that are deemed as startups by Sponsor based on criteria including, but not limited to, company age, revenue, and funding status, as determined by Sponsor at its sole discretion, to submit themselves as a "Potential Referral." In addition, at most two (2) entities that are under the control of the same ultimate beneficial owner ("UBO") registered with Sponsor will count as Potential Referrals during this Contest. Additional entities controlled by the same UBO, even if submitted with the referral link of another entrant, will not count as Potential Referrals. All Potential Referral submissions will be routed to an appropriate Sponsor sales team member to determine a Potential Referral's eligibility to open a deposit account with a Sponsor Bank (as defined in Rho's Terms of Service) through the Rho Services (as defined in Rho's Terms of Service) ("Rho Checking Account") and/or to open a Rho Treasury Account (as defined in Rho's Terms of Service).
                </p>
                <p className={styles.disclaimerText}>
                  <strong>Deposits:</strong> If that Potential Referral opens a Rho Checking Account and/or Rho Treasury Account and maintains an average deposit balance of $350,000 or more in that account or across both accounts for ninety (90) days after the opening of that account ("Deposit Balance"), the Potential Referral may be deemed as an "Qualified Referral" for that entrant. Sponsor will determine, at its sole discretion, whether a Potential Referral qualifies as an Qualified Referral based on the criteria outlined above, including account opening and maintaining the required Deposit Balance.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>Credit for Submission:</strong> Once an entity is submitted as a Potential Referral by an entrant, that entity may no longer be eligible to be submitted as a Potential Referral by another entrant. The earliest submission of a Potential Referral by an entrant that is received by Sponsor shall receive credit for that submission. It is at Sponsor's sole discretion to judge the assignment of credit to an entrant for a submission of a Potential Referral.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>Leaderboard:</strong> During the Contest Period, Sponsor shall maintain a leaderboard that depicts the number of submissions of Potential Referrals from entrants with the most submissions. Entrants shall be identified by their first names and the first letter of their last names. The leaderboard will be updated periodically by Sponsor. However, the final count of Qualified Referrals will not be determined until the final verification by Sponsor of their eligibility at the end of their 90-day periods. All information presented by the leaderboard is preliminary and will not be used by Sponsor to determine the Contest awards.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>Limit:</strong> There is no limit to the total number of Potential Referrals that an entrant can submit during the Contest Period. An entrant cannot submit its own entity as a Potential Referral. However, it can be submitted as a Potential Referral in the Contest by another entrant.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>Other Offers:</strong> This Contest may be combined with any other promotions or offers organized by Sponsor, subject to their terms and conditions. Potential Referrals submitted through the Contest's referral links will be evaluated for their eligibility for those separate promotions by a Sponsor sales team member. Eligibility will be determined by those promotions' respective terms and conditions and will not affect eligibility for this Contest. Potential Referrals will be eligible for the awards provided by those promotions in addition to any prizes awarded from this Contest.
                </p>
              </div>
              <h4 className={styles.disclaimerSubtitle}>5. Prize</h4>
              <p className={styles.disclaimerText}>
                The prizes, and their availability, are as followed:
              </p>
              <ul className={styles.disclaimerList}>
                <li>One (1) Grand Prize of $100,000, to be credited into the winner's Rho Checking Account.</li>
                <li>One (1) Second Prize of an offsite retreat sponsored by Sponsor (worth up to $25,000 in Approximate Retail Value). Destination, lodging, transportation, and other associated activities shall be chosen at Sponsor's sole discretion.</li>
                <li>All entrants shall be given referral bonuses equal to $1,000 per Qualified Referral made during the Contest Period, to be credited into that entrant's Rho Checking Account.</li>
                <li>All Qualified Referrals shall be given a referral bonus of $1,000, to be credited into their Rho Checking Accounts.</li>
              </ul>
              <h4 className={styles.disclaimerSubtitle}>6. Prize Restrictions and Requirements</h4>
              <p className={styles.disclaimerText}>
                Each entrant/entity is limited to the available number of prizes as described in Section 5 (Prize) and Section 7 (Winner Selection Process). Prizes are non-transferable and no substitution will be made except in Sponsor's sole discretion. Sponsor will not replace any lost or stolen prizes. Sponsor reserves the right to substitute a prize for one of equal or greater value if the designated prize should become unavailable for any reason. The value associated with each prize is taxable as income and each winner is solely responsible for any taxes and associated costs, including, but not limited to all applicable federal, state and local taxes that become due with respect to the value of each prize. The Sponsor must report the value of each prize to the Internal Revenue Service in the year a prize is received by the winner and will be reported to the winner and the Internal Revenue Service in the form of a Form 1099. Each winner is also responsible for any fees associated with their prize receipt and/or use, and any other costs or expenses not expressly listed in these Rules. Prizes must be redeemed within the period of notification of winning as set forth below.
              </p>
              <h4 className={styles.disclaimerSubtitle}>7. Winner Selection Process</h4>
              <div className={styles.disclaimerText}>
                <p className={styles.disclaimerText}>
                  After the end of the Contest Period, Sponsor will assess the total number of Qualified Referrals made by each entrant during the Contest Period. The determination of whether a Potential Referral qualifies as an Qualified Referral shall be made at the end of the 90-day period following the opening of its Rho Checking Account and/or Rho Treasury Account and the initial deposit of its required Deposit Balance. Any Potential Referral that did not maintain the Deposit Balance throughout this 90-day period shall be ineligible for any Contest prizes, and the entrant that submitted this Potential Referral shall not receive credit towards its progress for the Grand Prize or the Second Prize.
                </p>
                <p className={styles.disclaimerText}>
                  The entrant with the highest number of Qualified Referrals shall be awarded the Grand Prize. The entrant must have made at least ten (10) Qualified Referrals to be eligible. If multiple entrants have the same highest number of credited Qualified Referrals, the aggregate amounts of Deposit Balances made by the entrants' Qualified Referrals will be used as a tiebreaker. For example, if two entrants are both credited with thirty (30) Qualified Referrals, the entrant whose Qualified Referrals made an aggregate amount of Deposit Balance totaling $20,000,000 will win the Grand Prize over the entrant whose Qualified Referrals made an aggregate amount of Deposit Balance totaling $18,000,000. The latter entrant will be given the Second Prize, if eligible, as a result.
                </p>
                <p className={styles.disclaimerText}>
                  The entrant with the second highest number of Qualified Referrals, or the runner-up of a tiebreaker for the Grand Prize, shall be awarded the Second Prize. The entrant must have made at least five (5) Qualified Referrals to be eligible. If multiple entrants have the same second highest number of credited Qualified Referrals, including as nonwinners of a tiebreaker for the Grand Prize, the aggregate amounts of Deposit Balances made by the entrants' Qualified Referrals will be used as a tiebreaker. For example, if two entrants are both credited with twenty (20) Qualified Referrals, the entrant whose Qualified Referrals made an aggregate amount of Deposit Balance totaling $15,000,000 will win the Second Prize over the entrant whose Qualified Referrals made an aggregate amount of Deposit Balance totaling $13,000,000. The latter entrant(s) will receive only the referral bonus, if eligible, described in Section 7.4, as a result.
                </p>
                <p className={styles.disclaimerText}>
                  All entrants shall be awarded with a referral bonus that is equal to $1,000 per Qualified Referral made. Entrants do not need to make a minimum number of Qualified Referrals to be eligible for this referral bonus.
                </p>
                <p className={styles.disclaimerText}>
                  All submitted Potential Referrals that are deemed as Qualified Referrals shall be credited with $1,000 to their Rho Checking Account.
                </p>
              </div>
              <h4 className={styles.disclaimerSubtitle}>8. Winner Notification and Verification</h4>
              <div className={styles.disclaimerText}>
                <p className={styles.disclaimerText}>
                  Sponsor will notify all entrants eligible for a prize via a Linkedin message or email within seven (7) business days of the determination of an entrant's eligibility for a prize (the "Notification Date"). Eligible entrants must respond within fourteen (14) business days of the Notification Date and will be required to complete and return an Affidavit of Eligibility, Release of Liability, Publicity Release (where lawful), and IRS Form W-9. Since referrals may be made until the end of the Contest Period, such Notification Date may be set up to ninety (90) days after the conclusion of the Contest Period to allow for verification of Qualified Referrals.
                </p>
                <p className={styles.disclaimerText}>
                  If an eligible entrant cannot be contacted, fails to sign and return the required documents within the required time period, does not comply with these Rules, or prize is returned as undeliverable, then that entrant forfeits the prize. If an entrant that is eligible for the Grand Prize or the Second Prize is disqualified for any reason, then their prize may be awarded to the entrant with the next most Qualified Referrals, if any, at Sponsor's sole discretion. If an eligible entrant's Second Prize is upgraded to a Grand Prize in this manner, then they will no longer be eligible for this initial Second Prize, which may be awarded to the entrant with the next most Qualified Referrals, if any, at Sponsor's sole discretion.
                </p>
              </div>
              <h4 className={styles.disclaimerSubtitle}>9. Publicity Release</h4>
              <p className={styles.disclaimerText}>
                By submitting the nomination entry or by accepting a prize, entrants, and on behalf of their entity, grant Sponsor the right and permission to use their names, likenesses, voices, biographical information (such as city and state), and any statements by either the entrants or winners for advertising and promotional purposes, in any media worldwide, without additional compensation, unless prohibited by law.
              </p>
              <h4 className={styles.disclaimerSubtitle}>10. General Conditions</h4>
              <div className={styles.disclaimerText}>
                <p className={styles.disclaimerText}>
                  Sponsor reserves the right to cancel, suspend, or modify the Contest if fraud, technical failure, or any other factor impairs the integrity or proper functioning of the Contest, as determined by Sponsor in its sole discretion. Sponsor also reserves the right in its sole discretion to terminate, suspend, or modify the Contest at any time for any reason, including but not limited to changes in business priorities, regulatory concerns, or conference participation changes. If the Contest is terminated before the designated end date, Sponsor may, in its sole discretion, award the prize(s) from among all eligible Potential Referrals received up to the time of termination, provided that such Potential Referrals meet all eligibility requirements set forth in these Rules, including the minimum referral requirements for each prize tier.
                </p>
                <p className={styles.disclaimerText}>
                  Sponsor also reserves the right to disqualify any individual Sponsor believes has tampered with the entry process or violated these Rules and verify eligibility requirements of each entrant. All Contest materials are subject to verification and are void if (i) not obtained in accordance with these Rules and through legitimate channels, (ii) any part is counterfeited, altered, defective, damaged, illegible, reproduced, tampered with, mutilated or irregular in any way, (iii) are obtained where prohibited, or (iv) they contain printing, typographical, mechanical, or other errors.
                </p>
                <p className={styles.disclaimerText}>
                  Neither Sponsor nor anyone acting on its behalf will enter into any communications with any entrant regarding this Contest, except as expressly set forth in these Rules.
                </p>
                <p className={styles.disclaimerText}>
                  By participating in this Contest, entrants release the Sponsor and each and all of the Contest Entities, from any and all liability, damages or causes of action (however named or described) with respect to or arising out of participation in the Contest, and/or the receipt or use/misuse of any prize awarded, including, without limitation, liability for personal injury, death or property damage, except where such release is prohibited by law or in cases of gross negligence or willful misconduct.
                </p>
                <p className={styles.disclaimerText}>
                  Entrants assume all risk of loss, damage, destruction, delay or misdirection of Contest materials submitted to Sponsor. Failure to comply with these Rules may result in disqualification from the Contest.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>WARNING:</strong> ANY ATTEMPT BY AN ENTRANT OR ANY OTHER INDIVIDUAL TO DELIBERATELY DAMAGE ANY WEBSITE ASSOCIATED WITH THIS CONTEST OR UNDERMINE THE LEGITIMATE OPERATION OF THE CONTEST MAY BE A VIOLATION OF CRIMINAL AND CIVIL LAW, AND, SHOULD SUCH AN ATTEMPT BE MADE, SPONSOR RESERVES THE RIGHT TO PROSECUTE AND SEEK DAMAGES (INCLUDING ATTORNEY'S FEES) FROM ANY SUCH PERSON TO THE FULLEST EXTENT PERMITTED BY LAW. SPONSOR'S FAILURE TO ENFORCE ANY TERM OF THESE OFFICIAL RULES SHALL NOT CONSTITUTE A WAIVER OF THESE PROVISIONS.
                </p>
              </div>
              <h4 className={styles.disclaimerSubtitle}>11. Release and Liability Limit</h4>
              <p className={styles.disclaimerText}>
                By participating, entrants agree to release, discharge, indemnify and hold harmless Sponsor and Contest Entities and each of its and their respective officers, directors, employees, representatives, and agents (collectively, "Released Parties") from and against any and all liability, claim, costs (including attorneys' fees), losses, damages, fines, or actions of any kind whatsoever for any injuries, damages or losses to any person (including death) or property of any kind resulting in whole or in part, directly or indirectly, in connection with: (i) participation in any aspect of the Contest (including but not limited to travel to/from any Contest-related events, promotion/publicity, or any other Contest activity), (ii) the receipt, ownership, use or misuse of the prize awarded, including any travel associated with any prize, (iii) the Released Parties' violation of rights of publicity or privacy, claims of defamation or portrayal in a false light or based on any claim of infringement of intellectual property; (iv) entrant's registration material on any related website, or (v) any typographical, human, technical or other error in the printing, offering, selection, operation or announcement of any Contest activity and/or prize. THE RELEASED PARTIES ARE NOT RESPONSIBLE IF ANY PRIZE CANNOT BE AWARDED DUE TO CANCELLATIONS, DELAYS, OR INTERRUPTIONS DUE TO ACTS OF GOD, ACTS OF WAR, NATURAL DISASTERS, WEATHER, OR TERRORISM.
              </p>
              <h4 className={styles.disclaimerSubtitle}>12. Prize Disclaimers</h4>
              <p className={styles.disclaimerText}>
                Except as prohibited by law, Sponsor shall not be liable for any issues or damages incurred in connection with the receipt, claiming, or use of a prize, including but not limited to: missed flights, lost or stolen baggage, hotel overbookings or closures, transportation delays or cancellations, acts of God, other accommodation issues, travel postponements, restrictions or disruptions, personal injuries, illnesses, loss of property, or any other issues or expenses incurred as a result of winner's acceptance, use, or misuse of a prize.
              </p>
              <p className={styles.disclaimerText}>
                It is the winner's sole responsibility to make all necessary travel arrangements and to comply with all applicable travel laws and requirements or terms and conditions of accommodation providers (if applicable). Sponsor makes no representations or warranties regarding the availability, quality, or safety of any components of the prize. WINNERS ASSUME ALL RISKS ASSOCIATED WITH PARTICIPATION IN THE PRIZES.
              </p>
              <h4 className={styles.disclaimerSubtitle}>13. Disputes</h4>
              <p className={styles.disclaimerText}>
                Except where prohibited, entrants agree that any and all disputes, claims, and causes of action arising out of or related to this Contest shall be resolved individually, without resort to any form of class action, and exclusively by the appropriate court located in New York City under the laws of the State of New York.
              </p>
              <h4 className={styles.disclaimerSubtitle}>14. Privacy</h4>
              <p className={styles.disclaimerText}>
                Any personal information collected will be used in accordance with Sponsor's Privacy Policy https://www.rho.co/policies/privacy-policy. By participating in the Contest, entrants hereby agree to Sponsor's collection and usage of their personal information and acknowledge that they have read and accepted Sponsor's Privacy Notice. By claiming their prizes, winners hereby also agree to Sponsor's collection and usage of their personal information and acknowledge that they have read and accepted Sponsor's Privacy Notice.
              </p>
              <h4 className={styles.disclaimerSubtitle}>15. Winners List</h4>
              <p className={styles.disclaimerText}>
                For a winners list, send a self-addressed stamped envelope to: Rho, 100 Crosby Street, New York, NY 10012, or send an email request with your name and email with the Attn: Summer of Rho '25 Referral Contest – Winners List to summerofrho@rho.co. Such requests must be received within sixty (60) days after the end of the Contest Period. The winners list will be available after confirmation of the winners is complete. Please include a correct and valid email with your physical mail request as Sponsor will provide the winners list within a reply email.
              </p>
              <h4 className={styles.disclaimerSubtitle}>16. Sponsor</h4>
              <p className={styles.disclaimerText}>
                Under Technologies, Inc., DBA Rho Technologies<br />
                100 Crosby Street<br />
                New York, NY 10012<br />
                www.rho.co
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
