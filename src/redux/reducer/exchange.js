import {STATE_STATUS} from '../constants';
import {EXCHANGE_ACTIONS} from '../constants/exchange';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  exchanges: [],
  maxPage: 50,
  pageIndex: 1,
};

export const exchangeReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case EXCHANGE_ACTIONS.FETCH_EXCHANGE:
      if (payload.params.page === 1) {
        return {
          ...state,
          status: STATE_STATUS.FETCHING,
          exchanges: [],
          params: payload.params,
        };
      }
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
        params: payload.params,
      };

    case EXCHANGE_ACTIONS.FETCHED_EXCHANGE:
      if (payload.params.page === 1) {
        return {
          ...state,
          status: STATE_STATUS.FETCHED,
          exchanges: payload.exchanges,
          pageIndex: payload.params.page + 1,
        };
      }

      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        exchanges: [...state.exchanges, ...payload.exchanges],
        pageIndex: payload.params.page + 1,
      };

    case EXCHANGE_ACTIONS.FAILED_FETCH_EXCHANGE:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        error,
      };
    default:
      return state;
  }
};
