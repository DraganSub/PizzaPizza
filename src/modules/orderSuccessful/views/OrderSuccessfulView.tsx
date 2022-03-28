import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import PizzaImage from '../../../assets/images/Pizza-order-successful.png';
import { Button } from '../../../components';
import '../styles/orderSuccessful.css';

export const OrderSuccessfulView: FC = () => {
  const navigate = useNavigate();

  let handleClick = async () => {
    await navigate('/');
    await window.location.reload();
  };
  let handleOrderHistory = async () => {
    await navigate('/orderHistory');
    await window.location.reload();
  };
  return (
    <section className="order-successful">
      <div className="order-successful__container">
        <div className="order-successful__wrap">
          <img className="order-successful__img" src={PizzaImage} alt="" />
        </div>
        <div className="order-successful__wrap">
          <h1 className="order-successful__title">
            Your Pizza! Pizza! is on its way!
          </h1>

          <small className="order-successful__option">
            You should be enjoying your meal in no more than 45 minutes.
          </small>

          <div className="order-successful__links">
            <Button
              className="is-active"
              size="lg"
              onClick={() => handleClick()}
              custom__class="link__btn"
            >
              Buy Another
            </Button>
            <Button
              className="is-active"
              size="lg"
              onClick={() => handleOrderHistory()}
              custom__class="link__btn"
            >
              See Order History
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
