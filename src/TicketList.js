// TicketList.js

import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setTickets(data.tickets))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const ticketsByStatus = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.status]) {
      acc[ticket.status] = [];
    }
    acc[ticket.status].push(ticket);
    return acc;
  }, {});

  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

  const statusCounts = statusOrder.map(status => ({
    status,
    count: ticketsByStatus[status] ? ticketsByStatus[status].length : 0,
  }));

  return (
    <div className="ticket-list">
      {statusCounts.map(({ status, count }) => (
        <div key={status}>
          <b><p>
            {status} - {count}
          </p></b>
          <div className="status-cards">
            {ticketsByStatus[status] &&
              ticketsByStatus[status].map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
