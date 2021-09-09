// dependencies
import {put, call, fork, takeEvery} from 'redux-saga/effects';
// constants
import {EXCHANGE_ACTIONS} from '../redux/constants/exchange';
// api call
import {getExchange} from '../services/exchange';
// actions
import {fetchedExchange, failedFetchExchange} from '../redux/actions/exchange';

function* fetchExchanges({payload: {params}}) {
  try {
    const {data, error} = yield call(getExchange, params);
    console.log('bhosidk', data);

    if (error) {
      yield put(failedFetchExchange(error));
    } else {
      yield put(fetchedExchange(params, data));
    }
  } catch (error) {
    yield put(failedFetchExchange(error));
  }
}

export default fork(function* () {
  yield takeEvery(EXCHANGE_ACTIONS.FETCH_EXCHANGE, fetchExchanges);
});
