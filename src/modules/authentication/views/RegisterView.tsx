import React, { FC, useState } from 'react';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormInput } from '../../../components';
import { SignUp } from '../redux/actions';
import '../styles/auth.css';

export const RegisterView: FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(SignUp({ email: email, password: password, fullName: fullName }));
  };

  let disabled =
    password !== confirmPassword ||
    password.length < 6 ||
    confirmPassword.length < 6 ||
    password === '' ||
    confirmPassword === '' ||
    email === '' ||
    fullName === '';

  let passwordsIncorect =
    password === '' || confirmPassword === ''
      ? password === confirmPassword
      : password !== confirmPassword;
  let passwordTooShort = password === '' ? false : password.length < 6;

  return (
    <section className="auth-form">
      <form className="auth__container" onSubmit={e => handleSubmit(e)}>
        <h1 className="auth__title">Register! Register!</h1>
        <div className="auth__form-flex">
          <div className="auth__form-wrap">
            <FormInput
              labelClass="auth__label"
              placeholder="Full Name"
              label="Full Name"
              name="fullName"
              className="auth__input"
              value={fullName}
              onChange={e => setFullName(e.currentTarget.value)}
            />
          </div>
          <div className="auth__form-wrap">
            <FormInput
              labelClass="auth__label"
              placeholder="Email"
              label="Email"
              name="email"
              className="auth__input"
              type="email"
              onChange={e => setEmail(e.currentTarget.value)}
              value={email}
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
              onChange={e => setPassword(e.currentTarget.value)}
              value={password}
            />
            <small className="auth-form__error">
              {passwordTooShort &&
                'Password is too short (minimal 6 characters) '}
            </small>
          </div>

          <div className="auth__form-wrap">
            <FormInput
              labelClass="auth__label"
              placeholder="Confirm Password"
              label="Confirm Password"
              name="password"
              className="auth__input"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.currentTarget.value)}
              type="password"
            />
            <small className="auth-form__error">
              {passwordsIncorect && 'Passwords not matching'}
            </small>
          </div>
        </div>
        <div className="auth__btn--fullWidth">
          <Button
            className={disabled ? 'is-disabled' : 'is-active'}
            disabled={disabled}
            size="lg"
            custom__class="auth__btn"
          >
            Register
          </Button>
        </div>
        <small className="make-new-acc">
          Already have account?
          <Link className="link-to" to="/login">
            Let's login then!
          </Link>
        </small>
      </form>
    </section>
  );
};
