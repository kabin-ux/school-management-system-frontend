import React from 'react';
import { getStatusBadge } from '../../../utils/feeSalaryHelpers';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={getStatusBadge(status)}>
      {status}
    </span>
  );
};
