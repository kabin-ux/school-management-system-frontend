import { Mail, Phone, Users, MessageCircle, Unlink, Edit, Trash2 } from 'lucide-react';
import type { Parent } from '../../../types/parent.types';
import type { FC } from 'react';
import EmptyState from '../../../common/EmptyState';

interface ParentGridModalProps {
  parents: Parent[]
  onEdit: (parent: Parent) => void;
  onDelete: (parentId: number) => void;
}

export const ParentGrid: FC<ParentGridModalProps> = ({ parents, onEdit, onDelete }) => {
  return (
    <div>
      {!parents || parents.length === 0 ? (
        <div className="flex justify-center items-center">
          <EmptyState
            title='No Parents Found'
            description='There are currently no parents added to this class. Click the button above to add a parent.'
            icon={<Users className='w-14 h-14' />}
          />
        </div>
      ) : (
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
                <p className="text-sm text-gray-500 mb-2">{parent.id}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${parent.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                    }`}>
                    {parent.status}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                    {parent.students?.length} Children
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
                    <span className="text-xs font-medium">Linked Student {parent.students?.map((std) => (std.firstName))}</span>
                  </div>
                  {parent.students?.map((student, index) => (
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
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                  onClick={() => onEdit(parent)}
                >
                  <Edit className='w-4 h-4' />
                </button>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                  onClick={() => onDelete(parent.id)}
                >
                  <Trash2 className='w-4 h-4' />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}