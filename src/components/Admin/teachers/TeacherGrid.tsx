import { Mail, Phone, BookOpen, GraduationCap } from 'lucide-react';
import type { Teacher } from '../../../types/admin-dashboard.types';

interface TeacherGridProps {
  teachers: Teacher[];
}

export default function TeacherGrid({ teachers }: TeacherGridProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {teachers.map((teacher) => (
        <div key={teacher.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src={teacher.avatar}
              alt={teacher.firstName + ' ' + teacher.lastName}
              className="w-16 h-16 rounded-full object-cover mb-3"
            />
            <h3 className="font-semibold text-gray-900">{teacher.firstName + ' ' + teacher.lastName}</h3>
            <p className="text-sm text-gray-500 mb-2">{teacher.id}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${teacher.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
              }`}>
              {teacher.status}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{teacher.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-gray-600">
              <BookOpen className="w-4 h-4 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {teacher.teacherSubjects?.map((subject, index) => (
                  <span key={index} className="text-blue-600 text-xs">
                    {subject}{index < teacher.teacherSubjects.length - 1 ? ',' : '-'}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2 text-gray-600">
              <GraduationCap className="w-4 h-4 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {teacher.teacherClasses?.map((cls, index) => (
                  <span key={index} className="text-purple-600 text-xs">
                    {cls}{index < teacher.teacherClasses.length - 1 ? ',' : '-'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}