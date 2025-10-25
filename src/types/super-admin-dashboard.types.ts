export interface SuperAdmin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    address: string;
    created_by: string | null;
    status: "active" | "inactive" | string;
    profile_image: string | null;
    phone_number: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}

export interface SuperAdminForm {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    address: string;
    created_by: string | null;
    status: "active" | "inactive" | string;
    profile_image: string | null;
    phone_number: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}

export interface QuickAction {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface Notification {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
  time: string;
  target: string;
}

export interface SupportTicket {
  id: string;
  school: string;
  issue: string;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  created: string;
}