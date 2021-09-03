import axios from 'axios';
// import {BASE_URL} from '../redux/constants/index';

export const getMarket = params =>
  axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
    params,
  });
