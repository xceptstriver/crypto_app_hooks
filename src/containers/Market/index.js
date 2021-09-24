import React, {useEffect, useState, useMemo, useRef} from 'react';
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
import Coin from '../../components/Coin';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import NewChartComponent from '../../components/NewChartComponent';
import styles from './style';

const width = Dimensions.get('window').width;

const MarketScreen = props => {
  const coinsData = useSelector(
    state => (state.marketReducer || {}).coins || [],
  );

  const coins_status = useSelector(
    state => (state.marketReducer || {}).status || STATE_STATUS.UNFETCHED,
  );

  const maxPage = useSelector(state => state.marketReducer || {}).maxPage;
  const pageNo = useSelector(state => state.marketReducer || {}).pageIndex || 1;

  const dispatch = useDispatch();

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [loader, setLoader] = useState(true);
  // const maxPage = 50;
  // const pageNo = 1;

  useEffect(() => {
    fetchMaketData(pageNo);
  }, []);

  // useEffect(() => {

  //   const formatSparkLine = numbers => {
  //     const sevenDaysAgo = moment().subtract(7, 'days').unix();
  //     let formattedSparkline = numbers.map((_, i) => {
  //       return {
  //         x: sevenDaysAgo + (i + 1) * 3600,
  //         y: _,
  //       };
  //     });
  //     return formattedSparkline;
  //   };

  //   const formatMarketData = data => {
  //     let formattedData = [];
  //     data.forEach(item => {
  //       const formattedSparkLine = formatSparkLine(item.sparkline_in_7d.price);
  //       const formattedItem = {
  //         ...item,
  //         sparkline_in_7d: {
  //           price: formattedSparkLine,
  //         },
  //       };
  //       formattedData.push(formattedItem);
  //     });
  //     return formattedData;
  //   };

  //   const formattedResData = formatMarketData(data);
  // }, [selectedCoinData]);

  //handling loader
  useEffect(() => {
    if (coins_status === STATE_STATUS.FETCHED && loader) {
      setLoader(false);
    }
  }, [coins_status]);

  const fetchMaketData = pageIndex => {
    let fetchCoinsObj = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 20,
      page: pageIndex,
      sparkline: true,
      price_change_percentage: '7d',
    };
    console.log('data', fetchCoinsObj);
    dispatch(fetchMarket(fetchCoinsObj));
  };

  useEffect(() => {
    console.log('coinsData', coinsData);
  });
  const toggleModal = item => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  const renderItem = ({item}) => {
    let priceColor =
      item.price_change_percentage_7d_in_currency == 0
        ? bkgStyle.darkModetitleColor
        : item.price_change_percentage_7d_in_currency > 0
        ? 'green'
        : 'red';
    return (
      <Coin item={item} priceColor={priceColor} toggleModal={toggleModal} />
    );
  };

  const endReachedFetchListing = () => {
    if (
      coins_status == STATE_STATUS.FETCHED &&
      coins_status != STATE_STATUS.FETCHING &&
      pageNo < maxPage &&
      !loader
    ) {
      fetchMaketData(pageNo);
    }
  };

  const renderList = () => {
    return (
      <FlatList
        data={coinsData || []}
        keyExtractor={(item, index) =>
          `${item.id}-${item.symbol}-${item.ath}-${item.circulating_supply}-${index}`
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
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
        marginTop: 150,
      }}>
      <ActivityIndicator
        size={'large'}
        color={bkgStyle.titleColor}
        style={{
          borderRadius: 8,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );

  const renderListing = () => {
    if (
      loader ||
      (pageNo == 1 &&
        [STATE_STATUS.UNFETCHED, STATE_STATUS.FETCHING].includes(coins_status))
    ) {
      return renderLoader();
    } else {
      return renderList();
    }
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={{...styles.screen, backgroundColor: bkgStyle.darkModebkgColor}}>
        <View style={styles.header}>
          <Text
            style={{
              ...styles.title,
              fontFamily: 'Montserrat-SemiBold',
              color: bkgStyle.darkModetitleColor,
            }}>
            Market
          </Text>
        </View>
        <View style={styles.paddingView}></View>
        {renderListing()}
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}>
        {selectedCoinData && (
          <NewChartComponent
            cryptoId={selectedCoinData.id}
            currentPrice={selectedCoinData?.current_price}
            logoUrl={selectedCoinData?.image}
            name={selectedCoinData?.name}
            symbol={selectedCoinData?.symbol}
            priceChangePercentage7d={
              selectedCoinData?.price_change_percentage_7d_in_currency
            }
            sparkline={selectedCoinData?.sparkline_in_7d?.price}
          />
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default MarketScreen;
