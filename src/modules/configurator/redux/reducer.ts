import { OrderAction } from './actionTypes';
import { IOrder, SET_ORDER } from './types';

const initialState: IOrder = {
  toppings: [],
  quantity: 0,
  pizzaSize: [],
  shippmentDetails: [],
  totalPrice: 0,
};
export const orderReducer = (state = initialState, action: OrderAction) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        order: { ...action.payload },
      };
    default:
      return state;
  }
};
