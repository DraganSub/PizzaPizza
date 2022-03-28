import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import { MainLayout } from './Layouts';
import 'react-toastify/dist/ReactToastify.css';

import {
  setLoading,
  getUserById,
  SetNeedVerification,
  setGoogleCredentialsInDb,
} from './modules/authentication/redux/actions';
import { app } from './assets/service/config';
import { LoginView, RegisterView } from './modules/authentication/';

import { ConfiguratorView } from './modules/configurator/';
import { NotFoundView } from './modules/error/';
import { OrderHistoryView } from './modules/orderHistory/';
import { OrderSuccessfulView } from './modules/orderSuccessful/';
import { RootState } from './store/rootReducer';
import { ToastContainer } from 'react-toastify';
import { Loader } from './components';

const App = () => {
  const dispatch = useDispatch();
  const { authenticated, loading } = useSelector(
    (state: RootState) => state.authUser
  );

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = app.auth().onAuthStateChanged(async (user: any) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(SetNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });
    dispatch(setGoogleCredentialsInDb());
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <MainLayout>
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            path="/"
            element={authenticated ? <ConfiguratorView /> : <LoginView />}
          />
          <Route
            path="/orderHistory"
            element={authenticated ? <OrderHistoryView /> : <NotFoundView />}
          />
          <Route
            path="/orderSuccessful"
            element={authenticated ? <OrderSuccessfulView /> : <NotFoundView />}
          />

          <Route path="*" element={<NotFoundView />} />
          <Route
            path="/login"
            element={!authenticated ? <LoginView /> : <NotFoundView />}
          />
          <Route
            path="/register"
            element={!authenticated ? <RegisterView /> : <Navigate to="/" />}
          />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
