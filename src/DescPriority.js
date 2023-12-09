import React from 'react';
import TicketCard from './TicketCard';

const DescPriority = ({ ticketsData }) => {
  const priorityLevels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No Priority',
  };

  const groupTicketsByPriority = () => {
    const priorityMap = {};
    ticketsData.forEach(ticket => {
      const { priority } = ticket;
      if (!priorityMap[priority]) {
        priorityMap[priority] = [];
      }
      priorityMap[priority].push(ticket);
    });
    return priorityMap;
  };

  const priorityMap = groupTicketsByPriority();

  const sortedPriorities = Object.keys(priorityMap).sort((a, b) => b - a);

  return (
    <div className="ticket-list">
      {sortedPriorities.map(priority => (
        <div key={priority} className="priority">
          <b><p>{priorityLevels[priority]}</p></b>
          <div className="priority-cards">
            {priorityMap[priority].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DescPriority;
