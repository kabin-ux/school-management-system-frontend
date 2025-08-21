export const getStatusBadge = (status: string): string => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case 'Paid':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'Unpaid':
      return `${baseClasses} bg-red-100 text-red-800`;
    case 'Pending':
      return `${baseClasses} bg-orange-100 text-orange-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

export const calculatePaymentSummary = (amount: string) => {
  const numAmount = parseFloat(amount) || 0;
  return {
    paymentAmount: numAmount,
    netAmount: numAmount,
    remainingAfterPayment: Math.max(0, 4500 - numAmount)
  };
};
