import React from 'react';
import '../styles/notFoundView.css';
import NotFound from '../../../assets/images/404.png';
import { Button } from '../../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';

export const NotFoundView = () => {
  const { authenticated } = useSelector((state: RootState) => state.authUser);
  return (
    <div className="notFound">
      <div className="notFound__wrap">
        <img className="notFound__img" src={NotFound} alt="Not Found" />
        <p className="notFound__info">Page not found!</p>
        <div className="notFound__btn-wrap">
          {authenticated ? (
            <Link to="/">
              <Button
                className="is-active"
                size="lg"
                custom__class="notFound__btn"
              >
                Back to Pizza! Pizza!
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                className="is-active"
                size="lg"
                custom__class="notFound__btn"
              >
                Back to Login! Login!
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
