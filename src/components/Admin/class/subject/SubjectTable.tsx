import React from 'react';
import {  BookUser, Edit,  Trash2 } from 'lucide-react';
import EmptyState from '../../../../common/EmptyState';
import type { Subject } from '../../../../features/subjectSlice';

interface SubjectTableProps {
    subjects: Subject[];
    onEdit: (cls: Subject) => void;
    onDelete: (classId: string) => void;
}

export const SubjectTable: React.FC<SubjectTableProps> = ({ subjects, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm">

            {!subjects || subjects.length === 0 ? (
                <div className='flex justify-center'>
                    <EmptyState
                        title='No Subjects Found'
                        description='There are currently no class records. Click the button above to add a new class.'
                        icon={<BookUser className='w-14 h-14' />}
                    />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Subject</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Code</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Teacher</th>
                                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                subjects.map((subject) => (
                                    <React.Fragment key={subject.id}>
                                        <tr className="hover:bg-gray-50 cursor-pointer"
                                        >
                                            <td className="p-4 border-r border-gray-200 text-gray-900">{subject?.name}</td>
                                            <td className="p-4 border-r border-gray-200 text-gray-900">{subject?.code}</td>
                                            <td className="p-4 border-r border-gray-200 text-gray-900">{subject?.teacher}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-blue-600"
                                                        onClick={() => onEdit(subject)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-red-600"
                                                        onClick={() => onDelete(subject.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            )}
        </div>

    );
};