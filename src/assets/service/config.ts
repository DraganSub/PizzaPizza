import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  signInWithPopup,
} from 'firebase/auth';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyDXpVZ1k3iCQZWIrPsBjc7cRQaPmACVCQA',
  authDomain: 'react-redux-auth-c6925.firebaseapp.com',
  databaseURL:
    'https://react-redux-auth-c6925-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-redux-auth-c6925',
  storageBucket: 'react-redux-auth-c6925.appspot.com',
  messagingSenderId: '433592787277',
  appId: '1:433592787277:web:62eb4fa629ae01c62c5704',
  measurementId: 'G-1NNLN8QWZP',
});

export const authentincation = getAuth(app);
export {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  signInWithPopup,
};
export { serverTimestamp } from 'firebase/database';

export const googleProvider = new GoogleAuthProvider().setCustomParameters({
  prompt: 'select_account',
});
