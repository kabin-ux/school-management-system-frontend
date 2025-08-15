import { ChevronDown } from 'lucide-react';

interface SchoolPlanProps {
  currentPlan: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  accountStatus: string;
}

export default function SchoolPlan({
  currentPlan,
  subscriptionStart,
  subscriptionEnd,
  accountStatus
}: SchoolPlanProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Current Plan */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Plan</h3>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
            {currentPlan}
          </span>
          <button className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800">
            Manage Plan
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subscription Period */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Subscription Period</h3>
        <div className="text-sm text-gray-600">
          <p>Start: {subscriptionStart}</p>
          <p>End: {subscriptionEnd}</p>
        </div>
      </div>

      {/* Account Status */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Account Status</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">{accountStatus}</span>
        </div>
      </div>
    </div>
  );
}