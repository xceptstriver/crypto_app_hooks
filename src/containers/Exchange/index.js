import React from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {bkgStyle} from '../../constants';
import {STATE_STATUS} from '../../redux/constants/index';
import {fetchMarket} from '../../redux/actions/market';
import styles from './style';

const ExchangeScreen = () => {
  return (
    <Text style={{color: '#000', fontSize: 12}}>Exhnage ExchangeScreen</Text>
  );
};

export default ExchangeScreen;
