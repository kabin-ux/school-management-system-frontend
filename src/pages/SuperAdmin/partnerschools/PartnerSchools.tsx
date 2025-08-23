import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import { PartnerSchoolsTable } from '../../../components/SuperAdmin/partnerschools/PartnerSchoolsTable';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllSchools } from '../../../features/schoolSlice';

export const PartnerSchools: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.school)

  useEffect(() => {
    dispatch(getAllSchools())
  }, [dispatch])
  console.log(    dispatch(getAllSchools())
)

  const handleViewPartnerSchoolDetails = (schoolCode: string) => {
    navigate(`/super-admin/partner-schools/details/${schoolCode}`)

  };
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Schools Dashboard</h1>
              <p className="text-gray-600">List of all partnered schools and click to view its detailed information.</p>
            </div>

            <PartnerSchoolsTable onViewPartnerSchoolDetails={handleViewPartnerSchoolDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};