import {all} from 'redux-saga/effects';
import marketsSage from './market';

export default function* () {
  yield all([marketsSage]);
}
