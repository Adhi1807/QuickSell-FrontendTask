import React from 'react';

const TicketCard = ({ ticket }) => {
  return (
    <div className="card">
      <p>{ticket.id}</p>
      <p>{ticket.title}</p>
      <p></p>
    </div>
  );
};

export default TicketCard;