import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface SchoolData {
  id: string;
  schoolCode: string;
  schoolName: string;
  totalAdmins: string;
  totalAccountants: string;
  lastModified: string;
  status: 'Active' | 'Inactive';
}

export default function SchoolPermissionTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const schoolData: SchoolData[] = [
    { id: '1', schoolCode: 'TIC-001', schoolName: 'Springfield High School', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '2', schoolCode: 'TIC-002', schoolName: 'Oakwood Academy', totalAdmins: '2/2 max', totalAccountants: '1/2 max', lastModified: '2024-01-15 14:30', status: 'Inactive' },
    { id: '3', schoolCode: 'TIC-003', schoolName: 'Riverside School', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '4', schoolCode: 'TIC-004', schoolName: 'Greenfield College', totalAdmins: '1/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '5', schoolCode: 'TIC-001', schoolName: 'Springfield High School', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '6', schoolCode: 'TIC-002', schoolName: 'Oakwood Academy', totalAdmins: '2/2 max', totalAccountants: '1/2 max', lastModified: '2024-01-15 14:30', status: 'Inactive' },
    { id: '7', schoolCode: 'TIC-003', schoolName: 'Riverside School', totalAdmins: '1/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '8', schoolCode: 'TIC-004', schoolName: 'Greenfield College', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '9', schoolCode: 'TIC-001', schoolName: 'Springfield High School', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '10', schoolCode: 'TIC-002', schoolName: 'Oakwood Academy', totalAdmins: '1/2 max', totalAccountants: '1/2 max', lastModified: '2024-01-15 14:30', status: 'Inactive' },
    { id: '11', schoolCode: 'TIC-003', schoolName: 'Riverside School', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '12', schoolCode: 'TIC-004', schoolName: 'Greenfield College', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '13', schoolCode: 'TIC-001', schoolName: 'Springfield High School', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '14', schoolCode: 'TIC-002', schoolName: 'Oakwood Academy', totalAdmins: '1/2 max', totalAccountants: '1/2 max', lastModified: '2024-01-15 14:30', status: 'Inactive' },
    { id: '15', schoolCode: 'TIC-003', schoolName: 'Riverside School', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' },
    { id: '16', schoolCode: 'TIC-004', schoolName: 'Greenfield College', totalAdmins: '2/2 max', totalAccountants: '2/2 max', lastModified: '2024-01-15 14:30', status: 'Active' }
  ];

  const getStatusBadge = (status: string) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    );
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">School Permission management</h2>
            <p className="text-sm text-gray-600">View and manage all the permission of partnered school Staff</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search partnered school names"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sch Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SCHOOL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Number of Admins
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Numbers of Accountant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Latest Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schoolData.map((school, index) => (
              <tr key={school.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-sm font-medium text-blue-600">
                  {school.schoolCode}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {school.schoolName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.totalAdmins}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.totalAccountants}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.lastModified}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(school.status)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View and edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alphabet Navigation */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className="w-8 h-8 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}