// Title.js

import React from 'react';
import TicketCard from './TicketCard';

const Title = ({ ticketsData }) => {
  const sortTicketsByTitle = () => {
    const sortedTickets = [...ticketsData].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
    return sortedTickets;
  };

  const sortedTickets = sortTicketsByTitle();

  return (
    <div className="ticket-list">
      {sortedTickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default Title;
