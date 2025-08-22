export interface SchoolPayment {
  id: string;
  schoolCode: string;
  school: string;
  location: string;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  status: 'Active' | 'Inactive';
  subscription: 'Premium' | 'Basic';
  payment: string;
}