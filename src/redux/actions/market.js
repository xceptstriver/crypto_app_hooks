import {MARKET_ACTIONS} from '../constants/market';

export const fetchMarket = params => {
  return {
    type: MARKET_ACTIONS.FETCH_MARKET,
    payload: {
      params,
    },
  };
};

export const fetchedMarket = (params, coins) => {
  return {
    type: MARKET_ACTIONS.FETCHED_MARKET,
    payload: {
      params,
      coins,
    },
  };
};

export const failedFetchMarket = (params, error) => {
  return {
    type: MARKET_ACTIONS.FAILED_FETCH_MARKET,
    payload: {
      params,
    },
    error,
  };
};
