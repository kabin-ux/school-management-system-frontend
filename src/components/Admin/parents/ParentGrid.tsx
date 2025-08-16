import { Mail, Phone, Users, MessageCircle, Unlink } from 'lucide-react';

interface Parent {
  id: string;
  name: string;
  parentId: string;
  email: string;
  phone: string;
  linkedStudents: Array<{
    name: string;
    class: string;
  }>;
  status: 'Active' | 'Inactive';
  avatar: string;
}

export default function ParentGrid() {
  const parents: Parent[] = Array.from({ length: 8 }, (_, i) => ({
    id: `${i + 1}`,
    name: 'Michael Chen',
    parentId: 'TCH002',
    email: 'michael.chen@school.edu',
    phone: '+977-9765424458',
    linkedStudents: [
      { name: 'Priya Sharma', class: 'Class 5 Section A' },
      { name: 'Priya Sharma', class: 'Class 7 Section A' }
    ],
    status: 'Active' as const,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {parents.map((parent) => (
        <div key={parent.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src={parent.avatar}
              alt={parent.name}
              className="w-16 h-16 rounded-full object-cover mb-3"
            />
            <h3 className="font-semibold text-gray-900">{parent.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{parent.parentId}</p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                parent.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {parent.status}
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                Children
              </span>
            </div>
          </div>

          <div className="space-y-3 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{parent.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{parent.phone}</span>
            </div>
            <div className="text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">Linked Student (2)</span>
              </div>
              {parent.linkedStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-2 ml-6 mb-1">
                  <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs text-blue-600">👤</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
              <Unlink className="w-4 h-4" />
              Unlink
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}