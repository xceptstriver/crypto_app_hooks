import {marketReducer} from './market';
import {exchangeReducer} from './exchange';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  marketReducer,
  exchangeReducer,
});

export default rootReducer;
