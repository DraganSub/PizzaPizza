import { toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/rootReducer';
import { OrderDataAction } from './actionTypes';
import { app } from '../../../assets/service/config';
import { GET_ORDER_DATA, IOrderHistory } from './types';

export const getOrderHistory = (
  id: string
): ThunkAction<void, RootState, null, OrderDataAction> => {
  return async dispatch => {
    try {
      const res = await app.database().ref('orders').child(id);
      const result: IOrderHistory[] = [];
      await res.on('value', (snap: any) => {
        snap.forEach((snapshot: any) => {
          const { createdAt, totalPrice, progress, id } = snapshot.val();
          result.push({
            createdAt: new Date(createdAt).toDateString(),
            totalPrice,
            progress,
            id,
          });
        });
      });
      dispatch({
        type: GET_ORDER_DATA,
        payload: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error);
      }
    }
  };
};
