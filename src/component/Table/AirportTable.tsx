import React, { FC } from "react";
import styles from "./AirportTable.module.css";
import { AirportTableProps } from "@/types/types";



const AirportTable: FC<AirportTableProps> = ({ flights }) => {
  return (
    <div className={styles.airportTableContainer}>
      <table className={styles.airportTable}>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Airports</th>
            <th>Reserve</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.from + flight.to + flight.departure}>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{flight.departure}</td>
              <td>{flight.arrival}</td>
              <td>{`${flight.from} - ${flight.to}`}</td>
              <td>
                <button>Reserve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AirportTable;
