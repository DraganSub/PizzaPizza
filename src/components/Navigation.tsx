import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles/navigation.css';
import PizzaHeader from '../assets/images/pizza-header.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { SignOut } from '../modules/authentication/redux/actions';
import { Loader } from './Loader';
export const Navigation: FC = () => {
  const [navAction, setNavAction] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated, loading } = useSelector(
    (state: RootState) => state.authUser
  );

  let doSignOut = async () => {
    await dispatch(SignOut());
    await navigate('/login', { replace: true });
  };
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <nav className="nav">
      <button
        className={`nav__toggle ${
          navAction ? 'nav__toggle--is-closed' : 'nav__toggle--is-open'
        } `}
        onClick={() => setNavAction(!navAction)}
        title="navBtn"
      ></button>
      <ul
        className={`nav__list ${
          navAction ? 'nav__list--is-closed' : 'nav__list--is-open'
        } `}
      >
        <li className="nav__list-item">
          {authenticated ? (
            <Link to="/" className="nav__link">
              Pizz-á-tron
            </Link>
          ) : (
            <Link to="/login" className="nav__link">
              Pizz-á-tron
            </Link>
          )}
        </li>
        <li className="nav__list-item">
          <img src={PizzaHeader} alt="" className="nav__img" />
        </li>

        {authenticated ? (
          <li className="nav__list-item">
            <Link
              to="/login"
              className="nav__btn nav__link"
              onClick={() => doSignOut()}
            >
              Log out
            </Link>
          </li>
        ) : (
          <li className="nav__list-item">
            <Link to="/login" className="nav__btn nav__link">
              Login
            </Link>{' '}
            <Link to="/register" className=" nav__btn nav__link">
              Register
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
