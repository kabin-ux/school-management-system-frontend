export interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface SchoolData {
  id: string;
  schoolCode: string;
  schoolName: string;
  totalAdmins: string;
  totalAccountants: string;
  lastModified: string;
  status: 'Active' | 'Inactive';
}