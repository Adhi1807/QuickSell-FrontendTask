// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import TicketList from './TicketList';
import User from './User';
import Priority from './Priority';
import DescPriority from './DescPriority';

function App() {
  const [showGrouping, setShowGrouping] = useState(false);
  const [showOrdering, setShowOrdering] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  
  useEffect(() => {
    // Fetch data here and store it in ticketsData and usersData states
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setTicketsData(data.tickets))
      .catch(error => console.error('Error fetching tickets:', error));

    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setUsersData(data.users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDisplayClick = () => {
    setShowBox(!showBox);
    setShowGrouping(false);
    setShowOrdering(false);
  };

  const handleGroupingClick = () => {
    setShowGrouping(!showGrouping);
    setShowOrdering(false);
  };

  const handleOrderingClick = () => {
    setShowOrdering(!showOrdering);
    setShowGrouping(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <div className='top-sec'></div>
      <header className="App-header">
        <div className='button-container'>
          <button className='display-button' onClick={handleDisplayClick}>
            Display
          </button>
          {showBox && (
            <div className='floating-box'>
              <button className='grouping-button' onClick={handleGroupingClick}>
                Grouping
              </button>
              {showGrouping && (
                <select className='dropdown' onChange={(e) => handleOptionSelect(e.target.value)}>
                  <option value="option1">By Status</option>
                  <option value="option2">By User</option>
                  <option value="option3">By Priority</option>
                </select>
              )}
              <button className='ordering-button' onClick={handleOrderingClick}>
                Ordering
              </button>
              {showOrdering && (
                <select className='dropdown'>
                  <option value="optionA">Priority</option>
                  <option value="optionB">Title</option>
                </select>
              )}
            </div>
          )}
        </div>
        <div className="tic">
        {selectedOption === 'option2' && <User ticketsData={ticketsData} usersData={usersData} />}
        {selectedOption === 'option3' && <Priority ticketsData={ticketsData} />}
        {selectedOption === 'optionA' && <DescPriority ticketsData={ticketsData} />}
        {selectedOption !== 'option2' && selectedOption !== 'option3' && selectedOption !== 'optionA' && <TicketList />}
        </div>
      </header>
    </div>
  );
}

export default App;
