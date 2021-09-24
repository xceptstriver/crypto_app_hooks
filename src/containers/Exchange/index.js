import React, {useEffect, useState} from 'react';
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
import {fetchExchange} from '../../redux/actions/exchange';
import styles from './style';
import Exchange from '../../components/Exchange';

const ExchangeScreen = () => {
  const exchanges = useSelector(
    state => (state.exchangeReducer || {}).exchanges || [],
  );
  const exchange_status = useSelector(
    state => (state.exchangeReducer || {}).status || STATE_STATUS.UNFETCHED,
  );

  const maxPage = useSelector(state => state.exchangeReducer || {}).maxPage;
  const pageNo =
    useSelector(state => state.exchangeReducer || {}).pageIndex || 1;

  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchExchangeData(pageNo);
  }, []);

  useEffect(() => {
    console.log('useEffectMC', pageNo, maxPage, exchanges);
  });

  //handling loader
  useEffect(() => {
    if (exchange_status === STATE_STATUS.FETCHED && loader) {
      setLoader(false);
    }
  }, [exchange_status]);

  const renderItem = ({item}) => <Exchange item={item} />;

  const fetchExchangeData = pageIndex => {
    let fetchExchangeObj = {
      per_page: 10,
      page: pageIndex,
    };
    dispatch(fetchExchange(fetchExchangeObj));
  };

  const endReachedFetchListing = () => {
    if (
      exchange_status == STATE_STATUS.FETCHED &&
      exchange_status != STATE_STATUS.FETCHING &&
      pageNo < maxPage &&
      !loader
    ) {
      fetchExchangeData(pageNo);
    }
  };

  const renderList = () => {
    return (
      <FlatList
        data={exchanges || []}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.9}
        onEndReached={endReachedFetchListing}
      />
    );
  };

  const renderLoader = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <ActivityIndicator
        size={'large'}
        color={bkgStyle.titleColor}
        style={{
          borderRadius: 8,
          width: '100%',
        }}
      />
    </View>
  );

  const renderListing = () => {
    if (
      loader ||
      (pageNo == 1 &&
        [STATE_STATUS.UNFETCHED, STATE_STATUS.FETCHING].includes(
          exchange_status,
        ))
    ) {
      return renderLoader();
    } else {
      return renderList();
    }
  };

  return (
    <View
      style={{...styles.screen, backgroundColor: bkgStyle.darkModebkgColor}}>
      <View style={styles.header}>
        <Text
          style={{
            ...styles.title,
            fontFamily: 'Montserrat-SemiBold',
            color: bkgStyle.darkModetitleColor,
          }}>
          Crypto Exchanges
        </Text>
      </View>
      <View style={styles.paddingView}></View>
      {renderListing()}
    </View>
  );
};

export default ExchangeScreen;
