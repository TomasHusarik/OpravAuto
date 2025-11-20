import { useReducer, useEffect, useState } from 'react';
import { AuthContext, authReducer } from '@/utils/authTypes';
// Helper to decode JWT and check expiration
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp is in seconds since epoch
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    userType: undefined,
    orderId: undefined,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userType = localStorage.getItem('userType') as 'technician' | 'customer' | null;

    if (user && user.token) {
      if (isTokenExpired(user.token)) {
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        dispatch({ type: 'LOGOUT' });
        } else {
          if (userType === 'customer') {
            dispatch({ type: 'CUSTOMER_LOGIN', payload: user, userType: 'customer' });
          } else {
            dispatch({ type: 'LOGIN', payload: user, userType: 'technician' });
          }
          // Optionally, set up periodic check
          const interval = setInterval(() => {
            if (isTokenExpired(user.token)) {
              localStorage.removeItem('user');
              localStorage.removeItem('userType');
              dispatch({ type: 'LOGOUT' });
            }
          }, 60 * 1000); // check every minute
          setLoading(false);
          return () => clearInterval(interval);
        }
        setLoading(false);
        return;
      }
      setLoading(false);
    }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};