"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "../public/images/logo.png";
import styles from "./page.module.css";

export default function Home() {
  const { data: session }: any = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 50;

      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.block} />
      <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        {" "}
        <div className={styles.navbarStart}>
          <img src={Logo.src} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.navbarEnd}>
          {!session ? (
            <>
              <Link href="/pages/login" className={`${styles.card} ${isScrolled ? styles.scrolled : ""}`}>
                {" "}
                <h2 className={styles.cardLink}>
                  <span className={styles.cardText}>Login</span>
                  <span className={styles.arrow}>-&gt;</span>
                </h2>
              </Link>
            </>
          ) : (
            <>
              <button
                className={`${styles.logOut} ${isScrolled ? styles.scrolled : ""}`}
                onClick={() => {
                  signOut();
                }}
              >
                {" "}
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.header}>
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
                <Link href="/pages/register" className={styles.card}>
                  <h2 className={styles.cardLink}>
                    <span className={styles.cardText}>Get Started</span>
                    <span className={styles.arrow}>-&gt;</span>
                  </h2>
                </Link>
              </>
            ) : (
              <>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.reserve}>
        <div className={styles.reserveContent}>
          <h1>Reserve</h1>
          <h1>Your Flight Now!</h1>
          <a
            href="/pages/reserve"
            className={styles.reserveLink}
          >
            Reserve Flight
          </a>
        </div>
      </div>
    </main>
  );
}
