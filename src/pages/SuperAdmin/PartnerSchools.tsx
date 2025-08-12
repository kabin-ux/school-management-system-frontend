import React from 'react';
import { Sidebar } from '../../components/SuperAdmin/Sidebar';
import { DashboardHeader } from '../../components/SuperAdmin/DashboardHeadert';
import { PartnerSchoolsTable } from '../../components/SuperAdmin/PartnerSchoolsTable';

export const PartnerSchools: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Schools Dashboard</h1>
              <p className="text-gray-600">List of all partnered schools and click to view its detailed information.</p>
            </div>
            
            <PartnerSchoolsTable />
          </div>
        </div>
      </div>
    </div>
  );
};