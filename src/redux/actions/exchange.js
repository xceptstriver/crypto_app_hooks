import {EXCHANGE_ACTIONS} from '../constants/exchange';

export const fetchExchange = params => {
  return {
    type: EXCHANGE_ACTIONS.FETCH_EXCHANGE,
    payload: {
      params,
    },
  };
};

export const fetchedExchange = (params, exchanges) => {
  return {
    type: EXCHANGE_ACTIONS.FETCHED_EXCHANGE,
    payload: {
      params,
      exchanges,
    },
  };
};

export const failedFetchExchange = error => {
  return {
    type: EXCHANGE_ACTIONS.FAILED_FETCH_EXCHANGE,
    error,
  };
};
