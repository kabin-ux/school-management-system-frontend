export interface SchoolData {
    id: string;
    name: string;
    address: string;
    district: string;
    city: string;
    state: string;
    postal_code: string | number;
    latitude: string | number;
    longitude: string | number;
    phone: string;
    email: string;
    password: string;
    image: string;
    verified: boolean;
    principal_name: string;
    principal_contact: string;
    contact: string;
    school_type: string;
    status?: string;
    totalStudents?: number;
    totalTeachers?: number;
    totalParents?: number;
    subscription?: string;
    payment?: string;
    has_transport: boolean;
    established_year: string | number;
    student_capacity: string | number;
    school_code: string | number;
    details: string;
    grade_range: string;
    has_hostel: boolean;
    school_logo: string;

    updatedAt?:string;
}


export interface SchoolDataForm {
    name: string;
    address: string;
    district: string;
    city: string;
    state: string;
    postal_code: string | number;
    latitude: string | number;
    longitude: string | number;
    phone: string;
    email: string;
    password: string;
    image: string;
    verified: boolean;
    principal_name: string;
    principal_contact: string;
    contact: string;
    school_type: string;
    status?: string;
    totalStudents?: number;
    totalTeachers?: number;
    totalParents?: number;
    subscription?: string;
    payment?: string;
    has_transport: boolean;
    established_year: string | number;
    student_capacity: string | number;
    school_code: string | number;
    details: string;
    grade_range: string;
    has_hostel: boolean;
    school_logo: string;
}

export interface Admin {
  name: string;
  role: string;
  initials: string;
  bgColor: string;
}