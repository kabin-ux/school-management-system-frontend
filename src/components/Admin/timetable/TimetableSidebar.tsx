import { BookOpen, Users, BarChart3 } from 'lucide-react';

export default function TimetableSidebar() {
  const subjects = [
    { name: 'Mathematics', periods: 5 },
    { name: 'English', periods: 5 },
    { name: 'Science', periods: 5 },
    { name: 'Social Studies', periods: 5 },
    { name: 'Computer Science', periods: 5 },
    { name: 'Physical Education', periods: 5 },
    { name: 'Art', periods: 5 },
    { name: 'Music', periods: 5 }
  ];

  const teachers = [
    { name: 'Dr. Sara Johnson', subject: 'Mathematics', status: 'Available' },
    { name: 'Prof. Michael Brown', subject: 'English', status: 'Available' },
    { name: 'Dr. Emily Davis', subject: 'Science', status: 'Available' },
    { name: 'Ms. Jessica wilson', subject: 'Social Studies', status: 'Available' },
    { name: 'Mr. David Lee', subject: 'Computer Science', status: 'Available' },
    { name: 'Coach Anderson', subject: 'Physical Education', status: 'Available' },
    { name: 'Ms. Lisa Garcia', subject: 'Art', status: 'Busy' },
    { name: 'Mr. James Martinez', subject: 'Music', status: 'Busy' }
  ];

  const quickStats = [
    { label: 'Total Periods', value: '24' },
    { label: 'Scheduled', value: '13' },
    { label: 'Free Slots', value: '11' }
  ];

  return (
    <div className="space-y-6">
      {/* Subject Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Subject Overview</h3>
        </div>
        <div className="space-y-3">
          {subjects.map((subject) => (
            <div key={subject.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{subject.name}</span>
              <span className="text-sm font-medium text-gray-900">{subject.periods} periods</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Teachers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Available Teachers</h3>
        </div>
        <div className="space-y-3">
          {teachers.map((teacher) => (
            <div key={teacher.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                <p className="text-xs text-gray-500">{teacher.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  teacher.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`text-xs font-medium ${
                  teacher.status === 'Available' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {teacher.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Busy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
        </div>
        <div className="space-y-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <span className="text-lg font-bold text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}