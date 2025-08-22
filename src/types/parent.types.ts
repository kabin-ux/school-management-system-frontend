export interface Parent {
  id: string;
  name: string;
  parentId: string;
  email: string;
  phone: string;
  linkedStudents: Array<{
    name: string;
    class: string;
  }>;
  status: 'Active' | 'Inactive';
  avatar: string;
}