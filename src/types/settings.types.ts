export interface NotificationSettings {
  feePaymentReminders: boolean;
  dueDateAlerts: boolean;
  expenseReminders: boolean;
  feeCollectionUpdate: boolean;
  monthlyFinancialReport: boolean;
  budgetExceedAlert: boolean;
  systemMaintenance: boolean;
  chatNotifications: boolean;
  feeResentReminder: boolean;
  systemUpdates: boolean;
  dailyTransactionSummary: boolean;
}

export interface ProfileData {
  fullName: string;
  email: string;
  contactNumber: string;
  department: string;
  role: string;
  employeeId: string;
  avatar?: string;
}

export interface SecurityItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'success' | 'danger';
  icon: string;
  status?: string;
}

export interface AccountStats {
  accountCreated: string;
  lastLogin: string;
  lastLogout: string;
  dataUsage: string;
}
