import {STATE_STATUS} from '../constants';
import {MARKET_ACTIONS} from '../constants/market';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  coins: [],
  maxPage: 50,
  pageIndex: 1,
};

export const marketReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case MARKET_ACTIONS.FETCH_MARKET:
      if (payload.params.page === 1) {
        return {
          ...state,
          status: STATE_STATUS.FETCHING,
          coins: [],
          params: payload.params,
        };
      }
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
        params: payload.params,
      };
    case MARKET_ACTIONS.FETCHED_MARKET:
      if (payload.params.page === 1) {
        return {
          ...state,
          status: STATE_STATUS.FETCHED,
          coins: payload.coins,
          pageIndex: payload.params.page + 1,
        };
      }
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        coins: [...state.coins, ...payload.coins],
        pageIndex: payload.params.page + 1,
      };

    case MARKET_ACTIONS.FAILED_FETCH_MARKET:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        error,
      };
    default:
      return state;
  }
};
