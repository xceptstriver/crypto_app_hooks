import axios from 'axios';

export const getExchange = params =>
  axios.get(
    `https://api.coingecko.com/api/v3/exchanges?per_page=${params.per_page}&page=${params.page}`,
  );
