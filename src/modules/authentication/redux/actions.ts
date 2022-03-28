import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/rootReducer';
import { AuthStateAction } from './actionTypes';
import { toast } from 'react-toastify';

import {
  ISignInData,
  ISignUpData,
  IUser,
  NEED_VERIFICATION,
  SET_ERROR,
  SET_LOADING,
  SET_USER,
  SIGN_OUT,
} from './types';
import {
  app,
  authentincation,
  googleProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  serverTimestamp,
} from '../../../assets/service/config';
import { getRedirectResult } from '@firebase/auth';

export const SignUp = (
  data: ISignUpData
): ThunkAction<void, RootState, null, AuthStateAction> => {
  return async dispatch => {
    try {
      const response = await createUserWithEmailAndPassword(
        authentincation,
        data.email,
        data.password
      );
      if (response.user) {
        const userData: IUser = {
          email: data.email,
          fullName: data.fullName,
          id: response.user.uid,
          createdAt: serverTimestamp(),
        };
        await app
          .database()
          .ref('users')
          .child(response.user.uid)
          .set(userData);

        await sendEmailVerification(response.user);
        dispatch({
          type: NEED_VERIFICATION,
        });

        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
      toast.success('Welcome');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        dispatch({ type: SET_ERROR, payload: error.message });
      }
    }
  };
};

export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthStateAction> => {
  return async dispatch => {
    try {
      await app
        .database()
        .ref('users')
        .child(id)
        .once('value', snap => {
          let userData = snap.val();
          dispatch({
            type: SET_USER,
            payload: userData,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setError = (
  errorMsg: string
): ThunkAction<void, RootState, null, AuthStateAction> => {
  return async dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: errorMsg,
    });
  };
};

export const setLoading = (
  condition: boolean
): ThunkAction<void, RootState, null, AuthStateAction> => {
  return async dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: condition,
    });
  };
};

export const SignIn = (
  data: ISignInData
): ThunkAction<void, RootState, null, AuthStateAction> => {
  return async dispatch => {
    try {
      await signInWithEmailAndPassword(
        authentincation,
        data.email,
        data.password
      );
      toast.success('Welcome ');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
};

export const SignOut = (): ThunkAction<
  void,
  RootState,
  null,
  AuthStateAction
> => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      await signOut(authentincation);
      dispatch({
        type: SIGN_OUT,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const SetNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthStateAction
> => {
  return async dispatch => {
    dispatch({
      type: NEED_VERIFICATION,
    });
  };
};

export const SignInWithGoogle = (): ThunkAction<
  void,
  RootState,
  null,
  AuthStateAction
> => {
  return async dispatch => {
    try {
      await signInWithRedirect(authentincation, googleProvider);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
};

export const setGoogleCredentialsInDb = (): ThunkAction<
  void,
  RootState,
  null,
  AuthStateAction
> => {
  return async dispatch => {
    await getRedirectResult(authentincation).then(async socialAuthUser => {
      if (socialAuthUser?.user) {
        await console.log(socialAuthUser);

        const userData: IUser = {
          email: socialAuthUser?.user.email!,
          fullName: socialAuthUser?.user.displayName!,
          id: socialAuthUser?.user.uid!,
          createdAt: serverTimestamp(),
        };
        await app
          .database()
          .ref('users')
          .child(socialAuthUser?.user.uid!)
          .set(userData);

        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    });
  };
};
