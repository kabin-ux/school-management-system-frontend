import React from 'react';

interface AttendanceRecord {
    name: string;
    classSection: string;
    date: string;
    status: string;
}

interface AttendanceTableProps {
    attendanceData: AttendanceRecord[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendanceData }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border-gray-200">
            <div className="p-6 border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900">Student Attendance</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Name</th>
                            <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Class and Section</th>
                            <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Date</th>
                            <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Status</th>
                            <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {attendanceData.map((record, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-4 border-r border-gray-200">{record.name}</td>
                                <td className="p-4 border-r border-gray-200">{record.classSection}</td>
                                <td className="p-4 border-r border-gray-200">{record.date}</td>
                                <td className="p-4">
                                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        {record.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-gray-700 bg-gray-50 flex justify-center">
                <div className="flex space-x-1">
                    {Array.from({ length: 26 }, (_, i) => (
                        <button
                            key={i}
                            className="w-8 h-8 text-sm border-gray-200 rounded text-gray-700 hover:bg-gray-100"
                        >
                            {String.fromCharCode(65 + i)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};