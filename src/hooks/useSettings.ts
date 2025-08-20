import { useState, useCallback } from 'react';
import type { NotificationSettings, ProfileData } from '../types/settings.types';

export const useSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    feePaymentReminders: true,
    dueDateAlerts: false,
    expenseReminders: true,
    feeCollectionUpdate: true,
    monthlyFinancialReport: true,
    budgetExceedAlert: true,
    systemMaintenance: false,
    chatNotifications: false,
    feeResentReminder: true,
    systemUpdates: true,
    dailyTransactionSummary: false
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Sarah Michelle Johnson",
    email: "sarah.johnson@gmail.com/school.edu",
    contactNumber: "+977 9815484524",
    department: "Finance & Administration",
    role: "Senior Accountant",
    employeeId: "ACC-2024-001"
  });

  const toggleNotification = useCallback((key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const updateProfile = useCallback((data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  }, []);

  const handleLogout = useCallback(() => {
    console.log('Logging out...');
    // Implement logout logic
  }, []);

  const handleSafeLogout = useCallback(() => {
    console.log('Safe logout...');
    // Implement safe logout logic
  }, []);

  return {
    isEditing,
    setIsEditing,
    notifications,
    toggleNotification,
    profileData,
    updateProfile,
    handleLogout,
    handleSafeLogout
  };
};
