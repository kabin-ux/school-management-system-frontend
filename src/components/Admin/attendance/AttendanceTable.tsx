import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { AttendanceRecord } from '../../../types/attendance-record.types';
import { Users } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';

interface AttendanceTableProps {
    attendanceData: AttendanceRecord[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendanceData }) => {
    const navigate = useNavigate();

    const handleViewAttendance = (id: string) => {

        navigate(`/admin/attendance-monitoring/history/${id}`)
    };
    return (
        <div className="bg-white rounded-lg shadow-sm border-gray-200">
            <div className="p-6 border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900">Student Attendance</h3>
            </div>
            <div className="overflow-x-auto">
                {!attendanceData || attendanceData.length === 0 ? (
                    <EmptyState
                        title="No attendance data found"
                        description="There are currently no any attendance data in the system."
                        icon={<Users className="w-14 h-14" />}
                    />) : (
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Name</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Class and Section</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Subject</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Date</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Status</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {attendanceData?.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-r border-gray-200 cursor-pointer"
                                    onClick={() => handleViewAttendance(record.id)}
                                >
                                    <td className="p-4 border-r border-gray-200 text-gray-900">{record.studentName}</td>
                                    <td className="p-4 border-r border-gray-200 text-gray-900">{record.className} '{record.sectionName}'</td>
                                    <td className="p-4 border-r border-gray-200 text-gray-900">{record.subjectName}</td>
                                    <td className="p-4 border-r border-gray-200">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                            {record.status}
                                        </span>
                                    </td>
                                    {/* <td className="p-4">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        View Details
                                    </button>
                                </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};