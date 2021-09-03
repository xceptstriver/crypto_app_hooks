import {marketReducer} from './market';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  marketReducer,
});

export default rootReducer;
