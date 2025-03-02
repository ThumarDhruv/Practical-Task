export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

// User Types

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  dob: string;
  gender: string;
  status: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
}

export interface Props {
  users: User[];
  onDelete: (id: string | number) => void;
  onSelectUser: (id: string, selected: boolean) => void;
}
