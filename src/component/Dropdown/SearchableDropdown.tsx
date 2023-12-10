import { useState, FC } from 'react';
import styles from './SearchableDropdown.module.css'; 
import { SearchableDropdownProps } from '@/types/types';


const SearchableDropdown: FC<SearchableDropdownProps> = ({ items, placeholder, onInputChange }) => {
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    onInputChange(newValue); 
  };

  return (
    <div className={styles.dropdownContainer}>
      <input
        className={styles.dropdownInput}
        type="text"
        value={search}
        onChange={handleInputChange} 
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder={placeholder}
      />
      {isOpen && filteredItems.length > 0 && (
        <ul className={styles.dropdownList}>
          {filteredItems.map((item, index) => (
            <li
              className={styles.dropdownItem}
              key={index}
              onClick={() => {
                setSearch(item);
                setIsOpen(false);
                onInputChange(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default SearchableDropdown;
