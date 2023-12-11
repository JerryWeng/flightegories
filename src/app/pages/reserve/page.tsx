"use client";
import React, { FC, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SearchableDropdown from "@/component/Dropdown/SearchableDropdown";
import Table from "@/component/Table/AirportTable";
import styles from "./reserve.module.css";
import Logo from "../../../public/images/logo.png";
import {
  TowerControl,
  CalendarDays,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";

const Reserve: FC = () => {
  const [takeoffInput, setTakeoffInput] = useState("");
  const [arrivalInput, setArrivalInput] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const { data: session }: any = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleButtonClick = () => {
    const inputsArray = [
      takeoffInput,
      arrivalInput,
      departureAirport,
      arrivalAirport,
    ];
    console.log(inputsArray);
  };

  var airportItems: string[] = [];
  var departItems: string[] = [];
  var arrivalItems: string[] = [];
  const airportData = async () => {
    try {
      const res = await fetch("../api/fetch-data");
      if (res.status === 200) {
        const resJSON = await res.json();
        for (var i = 0; i < resJSON.airportData.rows.length; i++) {
          airportItems[i] =  resJSON.airportData.rows[i].airportname;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  airportData();

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
              <Link
                href="/pages/login"
                className={`${styles.card} ${
                  isScrolled ? styles.scrolled : ""
                }`}
              >
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
                className={`${styles.logOut} ${
                  isScrolled ? styles.scrolled : ""
                }`}
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
      <div className={styles.filterContainer}>
        <div className={styles.dropdownWithIcon}>
          <PlaneTakeoff className={styles.icon} />
          <SearchableDropdown
            items={departItems}
            placeholder="Takeoff date MM/DD/YYYY"
            onInputChange={setTakeoffInput}
          />
        </div>
        <div className={styles.dropdownWithIcon}>
          <PlaneLanding className={styles.icon} />
          <SearchableDropdown
            items={arrivalItems}
            placeholder="Arrival date MM/DD/YYY"
            onInputChange={setArrivalInput}
          />
        </div>
        <div className={styles.dropdownWithIcon}>
          <TowerControl className={styles.icon} />
          <SearchableDropdown
            items={airportItems}
            placeholder="Departure airport"
            onInputChange={setDepartureAirport}
          />
        </div>
        <div className={styles.dropdownWithIcon}>
          <TowerControl className={styles.icon} />
          <SearchableDropdown
            items={airportItems}
            placeholder="Arrival airport"
            onInputChange={setArrivalAirport}
          />
          <button className={styles.searchButton} onClick={handleButtonClick}>
            Search
          </button>
        </div>
      </div>
      <Table/>
    </main>
  );
};

export default Reserve;
