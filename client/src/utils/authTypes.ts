import { Customer } from '@/types/Customer';
import { Order } from '@/types/Order';
import { Technician } from '@/types/Technician';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router';

// Define the login response interface for technicians
export interface LoginResponse {
  technician: Technician;
  customer?: never;
  token: string;
}

// Define customer login response
export interface CustomerLoginResponse {
  customer: Customer;
  technician?: never;
  orderId: string;
  token: string;
}

// Define the auth state interface
export interface AuthState {
  user: (LoginResponse | CustomerLoginResponse) | null;
  userType?: 'technician' | 'customer'; // To distinguish between technician and customer
  orderId?: string; // For customer orders
}

// Define the auth actions
export type AuthAction =
  | { type: 'LOGIN'; payload: LoginResponse; userType?: 'technician' }
  | { type: 'CUSTOMER_LOGIN'; payload: CustomerLoginResponse; userType: 'customer' }
  | { type: 'LOGOUT' };

// Define the context type
export interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, userType: action.userType || 'technician' };
    case 'CUSTOMER_LOGIN':
      return { user: action.payload, userType: action.userType || 'customer', orderId: action.payload.orderId };
    case 'LOGOUT':
      return { user: null, userType: undefined };
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
};

export const getUser = (user: LoginResponse | CustomerLoginResponse | null, userType?: string) => {
  if (!user) return null;
  if (userType === "technician" && "technician" in user) {
    return user.technician;
  }
  if (userType === "customer" && "customer" in user) {
    return user.customer;
  }
  return null;
};