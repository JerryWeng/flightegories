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
import { Flight, FlightData } from "@/types/types";
import fetchFlights from "@/utils/getFlight";

const Reserve: FC = () => {
  const [takeoffInput, setTakeoffInput] = useState("");
  const [arrivalInput, setArrivalInput] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const { data: session }: any = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  var airportItems: string[] = [];
  var departItems: string[] = [];
  var arrivalItems: string[] = [];

  const handleButtonClick = async () => {
    try {
      const fetchedFlights = await fetchFlights(takeoffInput, arrivalInput, departureAirport, arrivalAirport);
      setFlights(fetchedFlights); 
      console.log(fetchedFlights);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const transformFlightsData = (flights: Flight[]): FlightData[] => {
    return flights.map(flight => ({
      from: flight.departure_airport, 
      to: flight.arrival_airport,     
      departure: flight.departure_time, 
      arrival: flight.arrival_time,     
      airports: `${flight.departure_airport} - ${flight.arrival_airport}`,
    }));
  };


  

  
  const fetchData = async () => {
    try {
      const res = await fetch("../api/fetch-data");
      if (res.status === 200) {
        const resJSON = await res.json();
        for (var i = 0; i < resJSON.airportData.rows.length; i++) {
          airportItems[i] = resJSON.airportData.rows[i].airportname;
        }

        var j = 0;
        for (var k = 0; k < resJSON.departureTimeData.rows.length; k++) {
          if (!departItems.includes(resJSON.departureTimeData.rows[k].departure_time.substring(0, 10))) {
            departItems[j] = resJSON.departureTimeData.rows[k].departure_time.substring(0, 10);
            j++;
          }
        }

        j = 0;
        for (var l = 0; l < resJSON.arrivalTimeData.rows.length; l++) {
          if (!arrivalItems.includes(resJSON.arrivalTimeData.rows[l].arrival_time.substring(0, 10))) {
            arrivalItems[j] = resJSON.arrivalTimeData.rows[l].arrival_time.substring(0, 10);
            j++;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();

  const fetchResults = async () => {
    try {
        
        const params = new URLSearchParams({
            takeoffDate: takeoffInput,
            arrivalDate: arrivalInput,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport
        });

        
        const response = await fetch(`../api/fetch-request`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFlights(data);
    } catch (error) {
        console.error('Fetching error:', error);
    }
};

    useEffect(() => {
      fetchResults();
    }, [])
    
    useEffect(() => {
      console.log(flights)
    }, [flights])
    


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
            placeholder="Takeoff date"
            onInputChange={setTakeoffInput}
          />
        </div>
        <div className={styles.dropdownWithIcon}>
          <PlaneLanding className={styles.icon} />
          <SearchableDropdown
            items={arrivalItems}
            placeholder="Arrival date"
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
      <Table flights={transformFlightsData(flights)}/>
    </main>
  );
};

export default Reserve;
