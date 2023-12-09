import { useState, FC } from 'react';
import styles from './SearchableDropdown.module.css'; // Adjust the import path
import { SearchableDropdownProps } from '@/types/types';


const SearchableDropdown: FC<SearchableDropdownProps> = ({ items, placeholder }) => {
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.dropdownContainer}>
      <input
        className={styles.dropdownInput}
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
               
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder={placeholder} // Use the placeholder prop here
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
