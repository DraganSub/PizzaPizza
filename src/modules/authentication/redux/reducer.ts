import { AuthStateAction } from './actionTypes';
import {
  IAuthUser,
  NEED_VERIFICATION,
  SET_ERROR,
  SET_LOADING,
  SET_USER,
  SIGN_OUT,
} from './types';

const initialState: IAuthUser = {
  user: null,
  authenticated: false,
  error: '',
  loading: false,
  needVerification: false,
};

export const userReducer = (state = initialState, action: AuthStateAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: true,
      };

    case NEED_VERIFICATION:
      return {
        ...state,
        needVerification: true,
      };

    default:
      return state;
  }
};
