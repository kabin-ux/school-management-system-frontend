import React from 'react';
import { User, Edit } from 'lucide-react';
import type { ProfileData } from '../../../types/settings.types';
import { ProfileForm } from './ProfileForm';
import { SectionHeader } from './SectionHeader';

interface ProfileSectionProps {
  profileData: ProfileData;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdateProfile: (data: Partial<ProfileData>) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileData,
  isEditing,
  onToggleEdit,
  onUpdateProfile
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <SectionHeader
        icon={User}
        iconColor="text-blue-600"
        title="Profile Information"
        description="Manage your personal details and contact information"
        action={
          <button 
            onClick={onToggleEdit}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        }
      />

      <ProfileForm
        profileData={profileData}
        isEditing={isEditing}
        onUpdate={onUpdateProfile}
      />
    </div>
  );
};
