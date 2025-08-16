import { UserPlus, Calendar, FileText, HelpCircle, Users } from 'lucide-react';

interface Activity {
  id: string;
  type: 'student' | 'timetable' | 'exam' | 'support' | 'teacher';
  description: string;
  performedBy: string;
  time: string;
}

export default function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'student',
      description: 'Added new student registration',
      performedBy: 'Ram Bahadur Karki',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'timetable',
      description: 'Updated Class 5A timetable',
      performedBy: 'Admin Raj Sharma',
      time: '4 hours ago'
    },
    {
      id: '3',
      type: 'exam',
      description: 'Published exam results for Grade 3',
      performedBy: 'Admin Maria Garcia',
      time: '6 hours ago'
    },
    {
      id: '4',
      type: 'support',
      description: 'Resolved parent support ticket #1247',
      performedBy: 'Admin David Chen',
      time: '8 hours ago'
    },
    {
      id: '5',
      type: 'teacher',
      description: 'Added new teacher profile',
      performedBy: 'Admin Lisa Brown',
      time: '2 hours ago'
    }
  ];

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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-600">Activity</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Performed By</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getActivityBgColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <span className="text-sm text-gray-900">{activity.description}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-600">{activity.performedBy}</td>
                <td className="py-4 text-sm text-gray-500">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}