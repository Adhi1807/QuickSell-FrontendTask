import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';

const User = ({ ticketsData, usersData }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (ticketsData && usersData) {
      const groupedTickets = groupTicketsByUser(ticketsData, usersData);
      setTickets(groupedTickets);
    }
  }, [ticketsData, usersData]);

  const groupTicketsByUser = (tickets, users) => {
    const usersMap = {};
    tickets.forEach(ticket => {
      const user = users.find(user => user.id === ticket.userId);
      if (user) {
        if (!usersMap[user.id]) {
          usersMap[user.id] = {
            user: user,
            tickets: []
          };
        }
        usersMap[user.id].tickets.push(ticket);
      }
    });
    return Object.values(usersMap);
  };

  return (
    <div className="ticket-list">
      {tickets.map(userTickets => (
        <div key={userTickets.user.id} className="user">
          <b><p>{userTickets.user.name}</p></b>
          <div className="user-cards">
            {userTickets.tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
