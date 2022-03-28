import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { FC } from 'react';
import { Button, FormInput } from '../../../components';
import { IIngredientsList } from '../../../const/constTypes';
import '../styles/orderModalViewStyle.css';
import { Animated } from 'react-animated-css';
interface IProps {
  setModal: () => void;
  ingredientsState: IIngredientsList[];
  qty: number;
  discountCode: string;
  setDiscountCode: (e: string) => void;
  totalOrderPrice: number;
  handleDiscountCode: (e: any) => void;
  setStreetAndNumber: (e: string) => void;
  streetAndNumber: string;
  setCity: (e: string) => void;
  city: string;
  setPostalCode: (e: string) => void;
  postalCode: string;
  setCountry: (e: string) => void;
  country: string;
  disabled: boolean;
  handleSubmit: () => void;
}

export const OrderModalView: FC<IProps> = (props: IProps) => {
  return (
    <Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
      <section className="order-modal animate__animated animate__bounce">
        <div className="order-modal__center">
          <button className="close__modal" onClick={props.setModal}></button>
          <h1 className="order-modal__title">Almost done!</h1>
          <form
            className="order-modal__container"
            onSubmit={() => props.handleSubmit()}
          >
            <div className="order-details order-modal__column">
              <h1 className="order-modal__subTitle order-details__title">
                Order details
              </h1>
              <h3 className="order-details__toppings-title">Toppings</h3>
              <div className="order-topping__row">
                {props.ingredientsState.map(({ isActive }, param) => {
                  if (isActive === true) {
                    return (
                      <p className="order-topping" key={param}>
                        {props.ingredientsState[param].name}
                      </p>
                    );
                  }
                })}
              </div>

              <p className="order-details__qty">QTY: {props.qty}</p>
              <hr className="modal__separator" />
              <div className="order-delivery">
                <h1 className="order-delivery__text order-delivery__text--font16">
                  Delivery
                </h1>
                <p className="order-delivery__text order-delivery__text--padding-btm">
                  Free delivery withing 1hour or you don’t have to pay.
                </p>
                <hr className="modal__separator" />
              </div>
              <div className="order-discount">
                <FormInput
                  type="text"
                  placeholder="Enter discount code"
                  name="discount"
                  className="modal-input"
                  value={props.discountCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.setDiscountCode(e.currentTarget.value)
                  }
                />

                <button
                  className="order-discount__apply-btn"
                  onClick={(e: FormEvent) =>
                    props.handleDiscountCode(e.preventDefault())
                  }
                >
                  Apply
                </button>
              </div>
              <div className="total-price">
                <h4 className="total-price__placeholder">Total price</h4>
                <h3 className="total-price__amount">
                  ${props.totalOrderPrice}
                </h3>
              </div>
            </div>
            <div className="shipping-details order-modal__column">
              <h1 className="order-modal__subTitle shipping-details__title">
                Shipping information
              </h1>
              <div className="shipping-data">
                <FormInput
                  name="streetNameAndNumber"
                  placeholder="Street name and number"
                  className="
                modal-input
                shipping-data__street shipping-data--full-width
              "
                  value={props.streetAndNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.setStreetAndNumber(e.currentTarget.value)
                  }
                />

                <div className="shippin-data__flex-row">
                  <FormInput
                    name="city"
                    placeholder="City"
                    className="
                  modal-input
                  shipping-data__street shipping-data--width@50
                "
                    value={props.city}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      props.setCity(e.currentTarget.value)
                    }
                  />
                  <FormInput
                    name="postalCode"
                    placeholder="Postal Code"
                    className="
                      modal-input
                      shipping-data__street shipping-data--width@50
                    "
                    value={props.postalCode}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      props.setPostalCode(e.currentTarget.value)
                    }
                  />
                </div>
                <FormInput
                  name="country"
                  placeholder="Country"
                  className="
                      modal-input
                      shipping-data__street shipping-data--full-width
                    "
                  value={props.country}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.setCountry(e.currentTarget.value)
                  }
                />
              </div>

              <h1 className="payment-details__title">Payment details</h1>
              <h3 className="payment-details__info">Cash on delivery</h3>
              <hr className="modal__separator" />

              <div className="finish-order">
                <Button
                  className={props.disabled ? 'is-disabled' : 'is-active'}
                  custom__class="modal-btn"
                  size="sm"
                  disabled={props.disabled}
                >
                  Finish Order
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Animated>
  );
};
