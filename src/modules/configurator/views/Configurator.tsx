import React, { FC, useEffect, useState } from 'react';
import '../styles/configurator.css';
import PizzaImg from '../../../assets/images/Pizza.png';
import { Button, FormInput, Loader } from '../../../components';
import { OrderModalView } from '../../orderModal/';
import { ChangeEvent } from 'react';
import { ToppingsWrap, PizzaSizeWrap } from '../components';
import { discountList, pizzaSizeList, ingredientsList } from '../../../const';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../redux/actions';
import { RootState } from '../../../store/rootReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const ConfiguratorView: FC = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.authUser);
  let navigate = useNavigate();

  /* toppings checked state */
  const [checkedState, setCheckedState] = useState(
    new Array(ingredientsList.length).fill(false)
  );

  /* state lists */

  let [ingredientState, setIngredientState] = useState([...ingredientsList]);
  let [pizzaSizeState, setPizzaSizeState] = useState([...pizzaSizeList]);

  /* input consts */

  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [totalPriceToppings, setTotalPriceToppings] = useState<number>(0);
  const [totalPriceSize, setTotalPriceSize] = useState<number>(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);
  const [streetAndNumber, setStreetAndNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  /* modal state */
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /***********************************************/

  /* useEffect  */

  useEffect(() => {
    let elements = 0;
    if (discount !== 0) {
      Number(
        (elements =
          discount * (qty * (totalPriceSize + totalPriceToppings))).toFixed(2)
      );
    } else {
      Number(
        (elements = qty * (totalPriceSize + totalPriceToppings)).toFixed(2)
      );
    }

    setTotalOrderPrice(Number(elements.toFixed(2)));
  }, [qty, totalPriceToppings, totalPriceSize, discount]);

  /* handle data functions */

  const handleIngredients = (index: number, isActive: boolean) => {
    ingredientState.map(({ isActive }, param) => {
      if (index === param) {
        let newData = [...ingredientState];
        newData[param].isActive = !isActive;
        setIngredientState(newData);
      }
    });
    handleIngredientTotal(index);
  };

  const handleIngredientTotal = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + ingredientsList[index].price;
        }
        return sum;
      },
      0
    );
    setTotalPriceToppings(totalPrice);
  };

  const handlePizzaSize = (index: number) => {
    pizzaSizeState.map(({ isActive }, param) => {
      pizzaSizeState[param].isActive = false;
      if (index === param) {
        let newDataSize = [...pizzaSizeState];
        newDataSize[param].isActive = !isActive;

        setPizzaSizeState(newDataSize);
      }
    });
    handleSizeTotal();
  };

  const handleSizeTotal = () => {
    let data = 0;
    pizzaSizeState.map(({ isActive }, param) => {
      if (isActive === true) {
        data = pizzaSizeState[param].price;
      }
    });
    setTotalPriceSize(data);
  };

  let handleDiscountCode = () => {
    let data = discountList.filter(discount => {
      if (discount.code === discountCode.toUpperCase()) {
        return discount.discount;
      }
    });
    setDiscount(data[0].discount);
  };

  const handleSubmitData = () => {
    let data: any[] = [];
    let pizzaSizeArray: any[] = [];
    ingredientState.map(({ isActive }, param: number) => {
      if (isActive === true) {
        data.push([ingredientState[param].name, ingredientState[param].price]);
      }
    });

    pizzaSizeState.map(({ isActive }, param) => {
      if (isActive === true) {
        pizzaSizeArray.push([
          pizzaSizeState[param].size,
          pizzaSizeState[param].price,
        ]);
      }
    });

    dispatch(
      setOrder(
        {
          toppings: [...data],
          totalPrice: totalOrderPrice,
          pizzaSize: [...pizzaSizeArray],
          quantity: qty,
          shippmentDetails: [
            {
              city: city,
              country: country,
              streetAndNumber: streetAndNumber,
              postalCode: postalCode,
            },
          ],
        },
        user?.id!
      )
    );

    setIngredientState([]);
    setPizzaSizeState([]);
    setCheckedState(new Array(ingredientsList.length).fill(false));
    navigate('orderSuccessful');
    toast.success('Order Submitted!');
  };

  /* Conditions */

  const setModalCondition = (condition: boolean) => {
    if (Number(qty) <= 0) {
      alert("Quantity can't be less than 0");
    } else if (totalPriceToppings <= 0) {
      alert('Please select at least one topping');
    } else if (totalPriceSize <= 0) {
      alert('Please select pizza size');
    } else {
      setModalIsOpen(!condition);
    }
  };

  let disabled = totalPriceSize <= 0 || totalPriceToppings <= 0;
  let modalDisabled =
    streetAndNumber === '' ||
    city === '' ||
    country === '' ||
    postalCode === '';

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!modalIsOpen ? (
        <section className="configurator">
          <div className="configurator__container">
            <div className="configurator__wrap">
              <h1 className="configurator__title">Toppings! Toppings!</h1>
              <ToppingsWrap
                ingredients={ingredientState}
                totalPriceToppings={totalPriceToppings}
                handleIngredients={handleIngredients}
              />
              <small className="configurator__toppings__price">
                Total price: ${totalPriceToppings}
              </small>
            </div>
            <div className="configurator__wrap">
              <h1 className="configurator__title">Pizza! Pizza! size</h1>
              <PizzaSizeWrap
                pizzaSize={pizzaSizeState}
                handlePizzaSize={handlePizzaSize}
              />
            </div>
            <div className="configurator__wrap">
              <h1 className="configurator__title">Get the discount</h1>
              <div className="discount">
                <FormInput
                  type="text"
                  placeholder="Enter discount code"
                  name="discount"
                  className="discount__elem discount__input"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.currentTarget.value)}
                />
                <button
                  className="discount__elem discount__apply-btn"
                  onClick={() => handleDiscountCode()}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="final">
              <div className="final__element">
                <img src={PizzaImg} alt="" className="final__img" />
              </div>
              <div className="final__element">
                <div className="final__order">
                  <div className="final__flex">
                    <FormInput
                      name="qty"
                      placeholder="0"
                      type="number"
                      value={qty}
                      className="final__qty"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setQty(e.currentTarget.value as any)
                      }
                    />

                    <p className="final__placeholder">QTY</p>
                  </div>
                  <span className="final__separator"></span>
                  <div className="final__flex">
                    <h2 className="final__price">${totalOrderPrice}</h2>
                    <p className="final__placeholder">ORDER TOTAL</p>
                  </div>
                </div>
              </div>
              <div className="final__element final__element__btn">
                <Button
                  className={disabled ? 'is-disabled' : 'is-active'}
                  size="lg"
                  onClick={() => setModalCondition(modalIsOpen)}
                >
                  Buy Pizza! Pizza!
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <OrderModalView
          setModal={() => setModalCondition(modalIsOpen)}
          qty={qty}
          ingredientsState={ingredientState}
          discountCode={discountCode}
          totalOrderPrice={totalOrderPrice}
          setDiscountCode={setDiscountCode}
          handleDiscountCode={handleDiscountCode}
          city={city}
          setCity={setCity}
          country={country}
          setCountry={setCountry}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          setStreetAndNumber={setStreetAndNumber}
          streetAndNumber={streetAndNumber}
          disabled={modalDisabled}
          handleSubmit={handleSubmitData}
        />
      )}
      ;
    </>
  );
};
