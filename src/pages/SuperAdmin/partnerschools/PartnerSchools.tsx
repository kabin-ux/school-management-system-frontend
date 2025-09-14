import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import { PartnerSchoolsTable } from '../../../components/SuperAdmin/partnerschools/PartnerSchoolsTable';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addSchoolBySuperAdmin, getAllSchools } from '../../../features/schoolSlice';
import { AddSchoolModal } from '../../../components/SuperAdmin/partnerschools/AddSchoolModal';
import { PlusIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const PartnerSchools: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { schools, loading } = useAppSelector((state) => state.school)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllSchools())
  }, [dispatch])

  const handleViewPartnerSchoolDetails = (schoolCode: string) => {
    navigate(`/super-admin/partner-schools/details/${schoolCode}`)

  };

  const handleAddSchool = async (schoolData: any) => {
    try {
      const res = await dispatch(addSchoolBySuperAdmin(schoolData))
      if (addSchoolBySuperAdmin.fulfilled.match(res)) {
        toast.success('School added successfully')
        setIsModalOpen(false)
      } else {
        const errorMessage = typeof res.payload === "string" ? res.payload : 'Error adding super admin'
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error adding school', error)
    }
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className='flex justify-between items-center'>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Schools Dashboard</h1>
                <p className="text-gray-600">List of all partnered schools and click to view its detailed information.</p>
              </div>
              <div className='flex items-center'>
                <button className='flex items-center gap-2 w-max bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
                  onClick={() => setIsModalOpen(true)}
                >
                  <div>
                    <PlusIcon className='w-4 h-4' />
                  </div>
                  Add School
                </button>
              </div>
            </div>
            <PartnerSchoolsTable
              schoolData={schools}
              onViewPartnerSchoolDetails={handleViewPartnerSchoolDetails}
            />

            <AddSchoolModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddSchool}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};