import {createStore, combineReducers} from 'redux';
import {TicketReducer_} from '../reducer/TickerReducer/TicketReducer';
import AuthenticationReducer from '../reducer/AuthReducer/AuthReducer';

const reducers = combineReducers({
  TicketReducer_,
  AuthenticationReducer,
});

const store = createStore(reducers);

export default store;
