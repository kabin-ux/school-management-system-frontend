import React from 'react';

interface StatusBadgeProps {
  status: 'Sent' | 'Failed' | 'Scheduled';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClasses = {
    'Sent': 'bg-green-100 text-green-800',
    'Failed': 'bg-red-100 text-red-800', 
    'Scheduled': 'bg-blue-100 text-blue-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;