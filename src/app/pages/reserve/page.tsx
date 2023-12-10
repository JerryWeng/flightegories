"use client"
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Dropdown from '@/component/Dropdown/Dropdown';
import Logo from "../../../public/images/logo.png";
import styles from "./reserve.module.css";

const Reserve = () => {
  //TODO: change datalist to be datalist that we want
  const { data: session }: any = useSession();
  const items = ['one', 'two', 'three', 'four'];
  const [isScrolled, setIsScrolled] = useState(false);

  const handleDropdownSelect = (selectedValue: string) => {
    
    console.log('Selected value:', selectedValue);
  };

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
    <main>
        <div className={styles.block} />
        <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        {" "}
        <div className={styles.navbarStart}>
            <Link href="/">
                <img src={Logo.src} alt="logo" className={styles.logo} />
            </Link>
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
      <div className='container'>
        <Dropdown data={items} onSelect={handleDropdownSelect} />
    </div>
    </main>
  );
};

export default Reserve;
