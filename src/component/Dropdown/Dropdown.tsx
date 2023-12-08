import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import { DropdownProps } from '@/types/types';


const Dropdown: React.FC<DropdownProps> = ({ data, onSelect }) => {
  const [value, setValue] = useState('');

  const handleSelection = (selectedValue: string) => {
    setValue(selectedValue);
    onSelect(selectedValue); 
  };

  return (
    <div className={styles.dropdown}>
      <input
        className={styles.input}
        list='dropdownOptions'
        onChange={(event) => setValue(event.target.value)}
        onBlur={() => handleSelection(value)} 
        placeholder='Search...'
      />
      <datalist id='dropdownOptions' className={styles.optionList}>
        {data.map((entry, index) => (
          <option key={index}>{entry}</option>
        ))}
      </datalist>
    </div>
  );
};

export default Dropdown;
