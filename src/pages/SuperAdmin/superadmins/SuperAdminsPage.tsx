import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import { PlusIcon } from 'lucide-react';
import { SuperAdminTable } from '../../../components/SuperAdmin/superadmins/SuperAdminTable';
import AddSuperAdminModal from '../../../components/SuperAdmin/superadmins/AddSuperAdminModal';
import EditSuperAdminModal from '../../../components/SuperAdmin/superadmins/EditSuperAdminModal';
import { useCreateSuperAdmin, useDeleteSuperAdmin, useSuperAdmins, useUpdateSuperAdmin } from '../../../hooks/useSuperAdmin';
import type { SuperAdminForm } from '../../../types/super-admin-super-admins.types';
import type { SuperAdmin } from '../../../types/super-admin-dashboard.types';

export const SuperAdminsPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: superAdmins = [], isLoading } = useSuperAdmins();
  const createSuperAdminMutation = useCreateSuperAdmin();
  const updateSuperAdminMutation = useUpdateSuperAdmin();
  const deleteSuperAdminMutation = useDeleteSuperAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSuperAdmin, setSelectedSuperAdmin] = useState<SuperAdmin | null>(null);

  const handleViewPartnerSchoolDetails = (schoolCode: string) => {
    navigate(`/super-admin/partner-schools/details/${schoolCode}`)
  };

  const handleAddSuperAdmin = async (superAdminData: any) => {
    createSuperAdminMutation.mutate(superAdminData, {
      onSuccess: () => setIsModalOpen(false)
    })
  }

  const handleEditSuperAdmin = (superAdmin: SuperAdmin) => {
    setSelectedSuperAdmin(superAdmin);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuperAdmin = (id: string, data: SuperAdminForm) => {
    updateSuperAdminMutation.mutate({ id, data }, {
      onSuccess: () => setIsEditModalOpen(false)
    })
  }

  const handleDeleteSuperAdmin = (id: any) => {
    deleteSuperAdminMutation.mutate(id)
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
              isLoading={isLoading}
            />

            <EditSuperAdminModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedSuperAdmin(null);
              }}
              onSubmit={handleUpdateSuperAdmin}
              superAdmin={selectedSuperAdmin}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};