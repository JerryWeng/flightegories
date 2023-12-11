import { sql } from "@vercel/postgres";

export default async function fetchFlights(takeoffInput: string, arrivalInput: string, departureAirport: string, arrivalAirport: string): Promise<any> {
  try {
      
      const params = new URLSearchParams({
          takeoffInput,
          arrivalInput,
          departureAirport,
          arrivalAirport,
      });

      const data = await sql`SELECT * FROM flights WHERE departure_airport = '${departureAirport}' AND arrival_airport = '${arrivalAirport}' AND departure_time LIKE '${takeoffInput}%' AND arrival_time LIKE '${arrivalInput}'%;`;
     
      return data.rows;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;  
}
}