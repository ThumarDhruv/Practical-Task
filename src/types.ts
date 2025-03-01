export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
}
