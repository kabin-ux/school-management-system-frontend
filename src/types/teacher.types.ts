export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  status: 'Active' | 'Inactive';
  password: string;
  gender: 'Male' | 'Female' | 'Other';
  address?: string | null;
  qualification: string;
  school_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}