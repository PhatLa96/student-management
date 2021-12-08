import { User } from 'models/user';
import { createContext, ReactNode } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

export interface AuthContextDefault {
  toggleAuth: (user: User) => void;
  toggleLogout: (user: User) => void;
}

export const AuthContext = createContext<AuthContextDefault>({
  toggleAuth: () => {},
  toggleLogout: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const toggleAuth = (user: User) => {
    localStorage.setItem('access_token', 'fake_token');
  };

  const toggleLogout = (user: User) => {
    localStorage.removeItem('access_token');
  };
  const authContextData = {
    toggleAuth,
    toggleLogout,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
