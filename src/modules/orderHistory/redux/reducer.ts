import { OrderDataAction } from './actionTypes';
import { GET_ORDER_DATA, GET_ORDER_DATA_START, IOrderData } from './types';

const initialState: IOrderData = {
  orderHistory: [],
  loading: false,
};
export const orderHistoryReducer = (
  state = initialState,
  action: OrderDataAction
) => {
  switch (action.type) {
    case GET_ORDER_DATA_START:
      return {
        ...state,
        loading: false,
      };
    case GET_ORDER_DATA:
      return {
        ...state,
        orderHistory: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};
