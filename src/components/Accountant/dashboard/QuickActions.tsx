import { Plus, FileText, Send, Download } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { 
      title: 'Add Payment', 
      subtitle: 'Accept fee payment', 
      icon: Plus, 
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    { 
      title: 'Generate Invoice', 
      subtitle: 'Create new invoice', 
      icon: FileText, 
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    { 
      title: 'Send Reminder', 
      subtitle: 'Payment reminder', 
      icon: Send, 
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    },
    { 
      title: 'Download Report', 
      subtitle: 'Generate', 
      icon: Download, 
      color: 'bg-teal-500 hover:bg-teal-600',
      textColor: 'text-white'
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <p className="text-gray-600 text-sm mb-6">Summary of collection fees</p>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${action.color}`}
            >
              <Icon className={`h-5 w-5 ${action.textColor} mr-3`} />
              <div className="text-left">
                <div className={`font-medium ${action.textColor}`}>{action.title}</div>
                <div className={`text-sm opacity-90 ${action.textColor}`}>{action.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}