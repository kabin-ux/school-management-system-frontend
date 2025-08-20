import { AccountActionsSection } from "../../../components/Accountant/settings/AccountActionsSection";
import { NotificationsSection } from "../../../components/Accountant/settings/NotificationsSection";
import { ProfileSection } from "../../../components/Accountant/settings/ProfileSection";
import { SecuritySection } from "../../../components/Accountant/settings/SecuritySection";
import { useSettings } from "../../../hooks/useSettings";
import type { AccountStats } from "../../../types/settings.types";

export default function SettingsPage() {
  const {
    isEditing,
    setIsEditing,
    notifications,
    toggleNotification,
    profileData,
    updateProfile,
    handleLogout,
    handleSafeLogout
  } = useSettings();

  const accountStats: AccountStats = {
    accountCreated: "March 15, 2025",
    lastLogin: "Current",
    lastLogout: "Yesterday",
    dataUsage: "24 GB"
  };

  const handleSecurityAction = (actionId: string) => {
    console.log('Security action:', actionId);
    // Implement security actions
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and system configuration</p>
      </div>

      <div className="space-y-6">
        <ProfileSection
          profileData={profileData}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          onUpdateProfile={updateProfile}
        />

        <NotificationsSection
          notifications={notifications}
          onToggleNotification={toggleNotification}
        />

        <SecuritySection
          onSecurityAction={handleSecurityAction}
        />

        <AccountActionsSection
          accountStats={accountStats}
          onLogout={handleLogout}
          onSafeLogout={handleSafeLogout}
        />
      </div>
    </div>
  );
}
