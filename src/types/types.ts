

export interface SearchableDropdownProps {
  items: string[];
  placeholder?: string; // Optional placeholder prop
  onInputChange: (value: string) => void;
}