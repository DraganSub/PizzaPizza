import { GET_ORDER_DATA, GET_ORDER_DATA_START, IOrderData } from './types';

interface GetOrdersAction {
  type: typeof GET_ORDER_DATA;
  payload: any[];
}

interface GetOrdersStartAction {
  type: typeof GET_ORDER_DATA_START;
}

export type OrderDataAction = GetOrdersAction | GetOrdersStartAction;
