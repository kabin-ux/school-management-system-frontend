
interface Transaction {
  id: string;
  studentName: string;
  class: string;
  date: string;
  amount: string;
  method: string;
  status: 'Paid' | 'Pending' | 'E-Stmt';
}

export default function TransactionTable() {
  const transactions: Transaction[] = [
    { id: 'TC-001', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'Bank Transfer', status: 'Paid' },
    { id: 'TC-002', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'E-Payment', status: 'Paid' },
    { id: 'TC-003', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'E-Stmt', status: 'Pending' },
    { id: 'TC-004', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'Bank Transfer', status: 'Paid' },
    { id: 'TC-005', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'Cash Payment', status: 'Paid' },
    { id: 'TC-006', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'E-Stmt', status: 'Pending' },
    { id: 'TC-007', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'Bank Transfer', status: 'Paid' },
    { id: 'TC-008', studentName: 'Ramesh Prasad', class: 'Class 12', date: 'Jan 3,2025', amount: 'Rs 50,000', method: 'Cash Payment', status: 'Paid' },
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'E-Stmt':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Transaction</h3>
          <p className="text-gray-600 text-sm">Most payment activities</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {transaction.class}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {transaction.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}