import React, { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormInput } from '../../../components';
import { SignIn, SignInWithGoogle } from '../redux/actions';
import GoogleLogo from '../../../assets/images/google-logo.png';

import '../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';

export const LoginView: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(SignIn({ email: email, password: password }));
    navigate('/', { replace: true });
  };

  const handleGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    dispatch(SignInWithGoogle());

    navigate('/', { replace: true });
  };

  let disabled = email === '' || password === '';
  return (
    <section className="auth-form">
      <form className="auth__container" onSubmit={e => handleSubmit(e)}>
        <h1 className="auth__title">Login! Login!</h1>
        <div className="auth__form-flex">
          <div className="auth__form-wrap">
            <FormInput
              labelClass="auth__label"
              placeholder="Email"
              label="Email"
              name="email"
              className="auth__input"
              type="email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="auth__form-wrap">
            <FormInput
              labelClass="auth__label"
              placeholder="Password"
              label="Password"
              name="password"
              className="auth__input"
              type="password"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="auth__btn--fullWidth">
          <Button
            className={disabled ? 'is-disabled' : 'is-active'}
            disabled={disabled}
            size="lg"
            custom__class="auth__btn"
          >
            Login
          </Button>
        </div>
        <small className="make-new-acc">
          Don't have Account?
          <Link className="link-to" to="/register">
            Make new one here!
          </Link>
        </small>
        <span className="auth-form__or">or</span>
        <small
          onClick={e => handleGoogleSignIn(e)}
          className="make-new-acc google"
        >
          Sign in with
          <img
            onClick={e => handleGoogleSignIn(e)}
            className="google__logo"
            src={GoogleLogo}
            alt="Google Logo"
          />
        </small>
      </form>
    </section>
  );
};
