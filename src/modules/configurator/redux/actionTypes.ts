import { IOrder, SET_ORDER } from './types';

interface SetOrderAction {
  type: typeof SET_ORDER;
  payload: IOrder;
}

export type OrderAction = SetOrderAction;
