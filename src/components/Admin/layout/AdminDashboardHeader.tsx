import React, { useState } from 'react';
import { User } from 'lucide-react';
import { UserProfile } from '../../../common/UserProfile';
import { useAuthUser } from '../../../hooks/useAuth';

export const AdminDashboardHeader: React.FC = () => {
  const { data: user } = useAuthUser();
  const [isViewProfileDialogOpen, setIsViewProfileDialogOpen] = useState(false);
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-end justify-end">

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Profile */}
          <div className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsViewProfileDialogOpen(true)}
          >
            <button
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none"
            >
              <User className="w-4 h-4 text-white" />
            </button>
            <span className="text-gray-800 font-medium">{user?.name}</span>
          </div>
        </div>
      </div>

      <UserProfile
        isOpen={isViewProfileDialogOpen}
        schoolData={user}
        onClose={() => setIsViewProfileDialogOpen(false)}
      />
    </div>
  );
};