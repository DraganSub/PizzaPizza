import { combineReducers } from 'redux';
import { userReducer } from '../modules/authentication/redux';
import { orderReducer } from '../modules/configurator/redux';
import { orderHistoryReducer } from '../modules/orderHistory/redux';

const rootReducer = combineReducers({
  authUser: userReducer,
  order: orderReducer,
  orderHistory: orderHistoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
