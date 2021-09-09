import {all} from 'redux-saga/effects';
import marketsSage from './market';
import exchangeSage from './exchange';

export default function* () {
  yield all([marketsSage, exchangeSage]);
}
