export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_START = 'GET_ORDER_DATA_START';
export interface IOrderHistory {
  createdAt: any;
  totalPrice: number;
  progress: string;
  id: string;
}
export interface IOrderData {
  orderHistory: IOrderHistory[];
  loading: boolean;
}
