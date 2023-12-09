"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "@/public/images/logo.png";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
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
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navbarStart}>
        <img src={Logo.src} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.navbarEnd}>
        {!session ? (
          <Link href="/pages/login" legacyBehavior>
            <a className={`${styles.card} ${isScrolled ? styles.scrolled : ""}`}>
              <h2 className={styles.cardLink}>
                <span className={styles.cardText}>Login</span>
                <span className={styles.arrow}>-&gt;</span>
              </h2>
            </a>
          </Link>
        ) : (
          <button
            className={`${styles.logOut} ${isScrolled ? styles.scrolled : ""}`}
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
