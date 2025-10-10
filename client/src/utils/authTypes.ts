import { Technician } from '@/types/Technician';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router';

// Define the login response interface
export interface LoginResponse {
  technician: Technician;
  token: string;
}

// Define the auth state interface
export interface AuthState {
  user: LoginResponse | null;
}

// Define the auth actions
export type AuthAction =
  | { type: 'LOGIN'; payload: LoginResponse }
  | { type: 'LOGOUT' };

// Define the context type
export interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

//#region  Custom hooks
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }
  
  return logout;
}