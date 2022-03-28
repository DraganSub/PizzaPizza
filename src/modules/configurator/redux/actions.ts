import { ThunkAction } from 'redux-thunk';
import { OrderAction } from './actionTypes';
import { IOrder, SET_ORDER } from './types';
import { app, serverTimestamp } from '../../../assets/service/config';
import { RootState } from '../../../store/rootReducer';
export const setOrder = (
  data: IOrder,
  id: string
): ThunkAction<void, RootState, null, OrderAction> => {
  return async dispatch => {
    try {
      let itemId: any = (await app.database().ref('orders').child(id).push())
        .key;
      await app
        .database()
        .ref('orders')
        .child(id)
        .child(itemId)
        .set({
          ...data,
          createdAt: serverTimestamp(),
          progress: 'in progress',
          id: itemId,
        });

      dispatch({
        type: SET_ORDER,
        payload: { ...data },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
};
