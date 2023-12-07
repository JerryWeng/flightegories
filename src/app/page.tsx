"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "../public/images/logo.png";
import styles from "./page.module.css";

export default function Home() {
  const { data: session }: any = useSession();
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <img src={Logo.src} alt="logo" className={styles.logo} />
        <div className={styles.about}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutHeading}>About</h2>
            <p className={styles.aboutText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
              dolorem quam sint molestiae commodi beatae neque repudiandae at
              odit debitis?
            </p>
          </div>
          <div className={styles.grid}>
            {!session ? (
              <>
                <Link href="/login" className={styles.card}>
                  <h2 className={styles.cardLink}>
                    <span className={styles.cardText}>Login</span>
                    <span className={styles.arrow}>-&gt;</span>
                  </h2>
                </Link>

                <Link href="/register" className={styles.card}>
                  <h2 className={styles.cardLink}>
                    <span className={styles.cardText}>Register</span>
                    <span className={styles.arrow}>-&gt;</span>
                  </h2>
                </Link>
              </>
            ) : (
              <>
                <button
                  className={styles.card}
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.reserve}>
        <a
          href="/reserve"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.reserveLink}
        >
          Reserve Flights
        </a>
      </div>
    </main>
  );
}
