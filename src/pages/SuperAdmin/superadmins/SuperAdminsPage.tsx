import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PlusIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { SuperAdminTable } from '../../../components/SuperAdmin/superadmins/SuperAdminTable';
import { createSuperAdmin, deleteSuperAdmin, fetchSuperAdmins, updateSuperAdmin, type SuperAdmin } from '../../../features/superAdminSlice';
import AddSuperAdminModal from '../../../components/SuperAdmin/superadmins/AddSuperAdminModal';
import EditSuperAdminModal from '../../../components/SuperAdmin/superadmins/EditSuperAdminModal';

export const SuperAdminsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { superAdmins } = useAppSelector((state) => state.superAdmin)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSuperAdmin, setSelectedSuperAdmin] = useState<SuperAdmin | null>(null);

  useEffect(() => {
    dispatch(fetchSuperAdmins())
  }, [dispatch])
  console.log(superAdmins)


  const handleViewPartnerSchoolDetails = (schoolCode: string) => {
    navigate(`/super-admin/partner-schools/details/${schoolCode}`)
  };

  const handleAddSuperAdmin = (superAdminData: any) => {
    try {
      console.log(superAdminData)
      dispatch(createSuperAdmin(superAdminData))
      toast.success('Super admin created successfully')
    } catch (error) {
      console.error('Error adding super admin', error)
    }
  }

  const handleEditSuperAdmin = (superAdmin: SuperAdmin) => {
    setSelectedSuperAdmin(superAdmin);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuperAdmin = (data: SuperAdmin) => {
    try {
      dispatch(updateSuperAdmin(data))
      toast.success('Super admin details updated successfully')
    } catch (error) {
      console.error('Error editing super admin', error)
    }
  }

  const handleDeleteSuperAdmin = (id: any) => {
    try {
      dispatch(deleteSuperAdmin(id))
      toast.success('Super admin removed successfully')
    } catch (error) {
      console.error('Error removing super admin', error)
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admins</h1>
                <p className="text-gray-600">List of all super admins, click to view its detailed information.</p>
              </div>
              <div className='flex items-center'>
                <button className='flex items-center gap-2 w-max bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
                  onClick={() => setIsModalOpen(true)}
                >
                  <div>
                    <PlusIcon className='w-4 h-4' />
                  </div>
                  Add Super Admin
                </button>
              </div>
            </div>
            <SuperAdminTable
              superAdminData={superAdmins}
              onViewSuperAdminDetails={handleViewPartnerSchoolDetails}
              onDelete={handleDeleteSuperAdmin}
              onEdit={handleEditSuperAdmin}
            />

            <AddSuperAdminModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddSuperAdmin}
            />

            <EditSuperAdminModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedSuperAdmin(null);
              }}
              onSubmit={handleUpdateSuperAdmin}
              superAdmin={selectedSuperAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};