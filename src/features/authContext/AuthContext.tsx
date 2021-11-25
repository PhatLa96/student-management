import { User } from 'models/user';
import { createContext, ReactNode, useReducer } from 'react';
import { authReducer, AuthState } from './AuthReducer';
import { AuthActionType } from './type';
const { TOGGLE_AUTH, TOGGLE_LOGOUT } = AuthActionType;

interface AuthContextProps {
  children: ReactNode;
}

export interface AuthContextDefault {
  authInfo: AuthState;
  toggleAuth: (user: User) => void;
  toggleLogout: (user: User) => void;
}

const authDefault = {
  isAuthenticated: false,
  user: {
    id: '',
    name: '',
  },
};

export const AuthContext = createContext<AuthContextDefault>({
  authInfo: authDefault,
  toggleAuth: () => {},
  toggleLogout: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [authInfo, dispatch] = useReducer(authReducer, authDefault);

  const toggleAuth = (user: User) => dispatch({ type: TOGGLE_AUTH, payload: user });

  const toggleLogout = (user: User) => dispatch({ type: TOGGLE_LOGOUT, payload: user });
  const authContextData = {
    authInfo,
    toggleAuth,
    toggleLogout,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
