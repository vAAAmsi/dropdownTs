// App.tsx
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './App.css';

interface Chip {
  id: number;
  label: string;
  image: string;
  mailId: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const newFilteredItems = items.filter(
      item =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !chips.some(chip => chip.label.toLowerCase() === item.label.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
    setSelectedIndex(-1);
  }, [inputValue, chips]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownVisible(true);
  };

  const handleItemClick = (item: Chip) => {
    setChips([...chips, { ...item, id: Date.now() }]);
    setInputValue('');
    setIsDropdownVisible(false);
  };

  const handleChipRemove = (id: number) => {
    const updatedChips = chips.filter(chip => chip.id !== id);
    setChips(updatedChips);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
    }

    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      handleItemClick(filteredItems[selectedIndex]);
    }
  };

  return (
    <div className="app">
      <div className='text'>
        Pick Users
      </div>
      <div className="chip-container">
        {chips.map(chip => (
          <div key={chip.id} className="chip">
            <img className='image' src={chip.image} alt={chip.label} />
            <span>{chip.label}</span>
            <span onClick={() => handleChipRemove(chip.id)}>X</span>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add new user..."
          onClick={() => setIsDropdownVisible(true)}
          className="input"
        />
      </div>
      {isDropdownVisible && (
        <ul>
          {
            filteredItems.length > 0? (
              filteredItems.map(item => (
                <li key={item.id} onClick={() => handleItemClick(item)}>
                  <img className='image' src={item.image} alt={item.label} />
                  <span>{item.label}</span>
                  <span>{item.mailId}</span>
                </li>
              ))
            ) : (
              <div style={{textAlign:"center",marginTop:"10px"}} >No items found</div>
            )
          }
        </ul>
      )}
    </div>
  );
};

const items: Chip[] = [
  { id: 1, label: 'Nick Giannopoulos', image: 'https://img.freepik.com/premium-photo/portrait-successful-confident-elegant-indian-arabian-young-businessman-suit-holding-open-laptop-his-hand-stand-near-desktop-his-modern-office-looking-camera-smiling_754108-631.jpg?size=626&ext=jpg&ga=GA1.1.426077606.1705393927&semt=ais', mailId: 'nick@example.com' },
  { id: 2, label: 'John Doe', image: 'https://img.freepik.com/free-photo/businessman-black-suit-makes-thumbs-up_114579-15900.jpg?size=626&ext=jpg&ga=GA1.1.426077606.1705393927&semt=ais', mailId: 'john@example.com' },
  { id: 3, label: 'Jane Smith', image: 'https://img.freepik.com/free-photo/young-fashion-smiling-hipster-man-city-cafe-during-lunch-time-with-notebook-suit_158538-8185.jpg?size=626&ext=jpg&ga=GA1.1.426077606.1705393927&semt=ais', mailId: 'jane@example.com' },
  { id: 4, label: 'Vamsi', image: 'https://img.freepik.com/premium-photo/portrait-successful-confident-elegant-indian-arabian-young-businessman-suit-holding-open-laptop-his-hand-stand-near-desktop-his-modern-office-looking-camera-smiling_754108-631.jpg?size=626&ext=jpg&ga=GA1.1.426077606.1705393927&semt=ais', mailId: 'vamsi@example.com' },
  { id: 5, label: 'NagRaj', image: 'https://img.freepik.com/free-photo/businessman-black-suit-makes-thumbs-up_114579-15900.jpg?size=626&ext=jpg&ga=GA1.1.426077606.1705393927&semt=ais', mailId: 'nag@example.com' },

];

export default App;
