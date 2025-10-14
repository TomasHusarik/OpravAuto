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
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user && user.token) {
      if (isTokenExpired(user.token)) {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      } else {
        dispatch({ type: 'LOGIN', payload: user });
        // Optionally, set up periodic check
        const interval = setInterval(() => {
          if (isTokenExpired(user.token)) {
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
          }
        }, 60 * 1000); // check every minute
        setLoading(false);
        return () => clearInterval(interval);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};