import { UserPlus, Calendar, FileText, HelpCircle, Users } from 'lucide-react';
import type { RecentActivity } from '../../../hooks/useDashboard';
import { useState } from 'react';
import { Pagination } from '../../../common/Pagination';

interface RecentActivityProps {
  recentActivity: RecentActivity[];
}

export const RecentActivitySection: React.FC<RecentActivityProps> = ({ recentActivity }) => {

  const getActivityIcon = (type: string) => {
    const iconClasses = "w-5 h-5";
    switch (type) {
      case 'student':
        return <UserPlus className={`${iconClasses} text-blue-600`} />;
      case 'timetable':
        return <Calendar className={`${iconClasses} text-purple-600`} />;
      case 'exam':
        return <FileText className={`${iconClasses} text-orange-600`} />;
      case 'support':
        return <HelpCircle className={`${iconClasses} text-gray-600`} />;
      case 'teacher':
        return <Users className={`${iconClasses} text-green-600`} />;
      default:
        return <UserPlus className={`${iconClasses} text-blue-600`} />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'student':
        return 'bg-blue-50';
      case 'timetable':
        return 'bg-purple-50';
      case 'exam':
        return 'bg-orange-50';
      case 'support':
        return 'bg-gray-50';
      case 'teacher':
        return 'bg-green-50';
      default:
        return 'bg-blue-50';
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(recentActivity.length / itemsPerPage);

  const paginatedData = recentActivity.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-600">Activity</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getActivityBgColor(activity.action)}`}>
                      {getActivityIcon(activity.action)}
                    </div>
                    <span className="text-sm text-gray-900">{activity.description}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-500">{new Date(activity.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

    </div>
  );
}