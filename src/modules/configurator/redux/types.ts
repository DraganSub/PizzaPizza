export const SET_ORDER = 'SET_ORDER';

export interface IShipment {
  city: string;
  country: string;
  postalCode: string;
  streetAndNumber: string;
}
export interface IOrder {
  toppings: string[];
  quantity: number;
  pizzaSize: any[];
  totalPrice: number;
  shippmentDetails: IShipment[];
}
