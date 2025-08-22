export interface User {
  id: string;
  role: "superadmin" | "admin" | "accountant";
  token: string;
}

export interface AuthState {
  user: any | null;
  role: "superadmin" | "admin" | "accountant" | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}