import { UserPlus, Users, UserCheck } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      
      <div className="space-y-3">
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Student
        </button>
        <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
          <Users className="w-5 h-5" />
          Add Teacher
        </button>
        <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2">
          <UserCheck className="w-5 h-5" />
          Add Accountant
        </button>
      </div>
    </div>
  );
}