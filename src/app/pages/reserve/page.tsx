"use client"
import { FC, useState } from 'react';
import SearchableDropdown from '@/components/Dropdown/SearchableDropdown'; 
import styles from './Reserve.module.css';
import {TowerControl, CalendarDays, PlaneTakeoff, PlaneLanding} from 'lucide-react'
import Navbar from '@/components/Navbar/Navbar';

const Reserve: FC = () => {
  const [takeoffInput, setTakeoffInput] = useState('');
  const [arrivalInput, setArrivalInput] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');

  const handleButtonClick = () => {
    const inputsArray = [takeoffInput, arrivalInput, departureAirport, arrivalAirport];
    console.log(inputsArray);
  };

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.dropdownWithIcon}>
        <PlaneTakeoff className={styles.icon} />
        <SearchableDropdown items={items} placeholder="Takeoff date MM/DD/YYYY" onInputChange={setTakeoffInput}  />
      </div>
      <div className={styles.dropdownWithIcon}>
        <PlaneLanding className={styles.icon} />
        <SearchableDropdown items={items} placeholder="Arrival date MM/DD/YYY" onInputChange={setArrivalInput}/>
      </div>
      <div className={styles.dropdownWithIcon}>
        <TowerControl className={styles.icon} />
        <SearchableDropdown items={items} placeholder="Departure airport" onInputChange={setDepartureAirport} />
      </div>
      <div className={styles.dropdownWithIcon}>
        <TowerControl className={styles.icon} />
        <SearchableDropdown items={items} placeholder="Arrival airport" onInputChange={setArrivalAirport}/>
        <button className={styles.searchButton} onClick={handleButtonClick}>Search</button>
      </div>
    </div>
  );
};

export default Reserve;
