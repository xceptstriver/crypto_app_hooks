// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {MARKET_ACTIONS} from '../redux/constants/market';
// api call
import {getMarket} from '../services/market';
// actions
import {fetchedMarket, failedFetchMarket} from '../redux/actions/market';
import {SAMPLE_DATA} from '../constants/index';
import moment from 'moment';

function* fetchMarkets({payload: {params}}) {
  try {
    const {data, error} = yield call(getMarket, params);
    const formatSparkline = numbers => {
      const sevenDaysAgo = moment().subtract(7, 'days').unix();
      let formattedSparkline = numbers.map((item, index) => {
        return {
          x: sevenDaysAgo + (index + 1) * 3600,
          y: item,
        };
      });

      return formattedSparkline;
    };

    const formatMarketData = data => {
      let formattedData = [];

      data.forEach(item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);

        const formattedItem = {
          ...item,
          sparkline_in_7d: {
            price: formattedSparkline,
          },
        };

        formattedData.push(formattedItem);
      });

      return formattedData;
    };

    console.log('priceData', SAMPLE_DATA[0].sparkline_in_7d.price[0]);

    const formattedResponse = formatMarketData(data);
    console.log(
      'formattedPricedata',
      formattedResponse[0].sparkline_in_7d.price[0],
    );
    if (error) {
      yield put(failedFetchMarket(params, error));
    } else {
      yield put(fetchedMarket(params, formattedResponse));
    }
  } catch (error) {
    yield put(failedFetchMarket(params, error));
  }
}

export default fork(function* () {
  yield takeEvery(MARKET_ACTIONS.FETCH_MARKET, fetchMarkets);
});
