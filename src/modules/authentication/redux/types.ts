export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_WITH_FACEBOOK = 'SIGN_IN_WITH_FACEBOOK';
export interface IUser {
  fullName: string;
  email: string;
  id: string;
  createdAt: any;
}

export interface IAuthUser {
  user: IUser | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  fullName: string;
  email: string;
  password: string;
}
