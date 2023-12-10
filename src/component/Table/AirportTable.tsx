import { useState, FC } from "react";
import styles from "./AirportTable.module.css";

interface Airport {
  id: number;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  airports: string;
}

const AirportTable = () => {
  const [data, setData] = useState<Airport[]>([
    {
      id: 1,
      from: "A",
      to: "B",
      departure: "10:00",
      arrival: "12:00",
      airports: "AB",
    },
    {
      id: 2,
      from: "C",
      to: "D",
      departure: "10:00",
      arrival: "12:00",
      airports: "AB",
    },
    {
      id: 3,
      from: "E",
      to: "F",
      departure: "10:00",
      arrival: "12:00",
      airports: "AB",
    },
    {
      id: 4,
      from: "B",
      to: "A",
      departure: "10:00",
      arrival: "12:00",
      airports: "AB",
    },
  ]);

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
          {data.map((airport) => (
            <tr key={airport.id}>
              <td>{airport.from}</td>
              <td>{airport.to}</td>
              <td>{airport.departure}</td>
              <td>{airport.arrival}</td>
              <td>{airport.airports}</td>
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
