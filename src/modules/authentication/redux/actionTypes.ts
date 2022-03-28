import {
  IUser,
  SET_ERROR,
  SET_LOADING,
  SET_USER,
  SIGN_OUT,
  NEED_VERIFICATION,
} from './types';

interface SetUserAction {
  type: typeof SET_USER;
  payload: IUser;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetSignOutAction {
  type: typeof SIGN_OUT;
}

interface SetNeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

export type AuthStateAction =
  | SetUserAction
  | SetLoadingAction
  | SetErrorAction
  | SetSignOutAction
  | SetNeedVerificationAction;
