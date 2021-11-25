import { User } from 'models/user';
import { AuthActionType } from './type';

const { TOGGLE_AUTH, TOGGLE_LOGOUT } = AuthActionType;

export interface AuthState {
  isAuthenticated: boolean;
  currentUser?: User;
}

export interface AuthAction {
  type: AuthActionType;
  payload: User;
}

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case TOGGLE_AUTH: {
      state.isAuthenticated = !state.isAuthenticated;
      state.currentUser = action.payload;
      localStorage.setItem('access_token', 'fake_token');
      return state;
    }
    case TOGGLE_LOGOUT: {
      localStorage.removeItem('access_token');
      return state;
    }
    default:
      return state;
  }
};
