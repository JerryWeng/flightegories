

export interface SearchableDropdownProps {
  items: string[];
  placeholder?: string; // Optional placeholder prop
  onInputChange: (value: string) => void;
}

export interface Flight {
  airline: string;
  arrival_airport: string;
  arrival_time: string;
  departure_airport: string;
  departure_time: string;
  flightno: string;
}

export interface FlightData {
  from: string;  
  to: string;    
  departure: string; 
  arrival: string;   
  airports: string;  
}

export interface AirportTableProps {
  flights: FlightData[];
}
