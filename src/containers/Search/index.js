import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import {bkgStyle} from '../../constants';
import Coin from '../../components/Coin';
import {useSelector, useDispatch} from 'react-redux';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import NewChartComponent from '../../components/NewChartComponent';

const width = Dimensions.get('window').width;
const SearchScreen = props => {
  const [inputValue, setInputValue] = React.useState(null);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const coinsData = useSelector(
    state => (state.marketReducer || {}).coins || [],
  );

  useEffect(() => {
    coinsData
      .filter((_, i) => _.name.includes(inputValue))
      .map((item, i) => {
        console.log('item', item.name);
      });
  }, [inputValue]);
  const toggleModal = item => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={{...styles.screen, backgroundColor: bkgStyle.darkModebkgColor}}>
        <View
          style={{
            ...styles.textInputWrapper,
            backgroundColor: bkgStyle.darkModesecBkgColor,
          }}>
          <Ionicons name={'search-outline'} color={'#888'} size={26} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={bkgStyle.placeholderColor}
            selectionColor={'#888'}
            returnKeyType={'search'}
            value={inputValue}
            // blurOnSubmit={true}
            onChangeText={value => {
              setInputValue(value);
            }}
            style={{
              ...styles.textInput,
              color: bkgStyle.darkModesecTxtColor,
              fontFamily: 'Montserrat-SemiBold',
            }}
          />
        </View>
        <View style={styles.flatlistWrapper}>
          <ScrollView contentContainerStyle={styles.flatlistContainer}>
            {coinsData
              .filter((_, i) => _.name.includes(inputValue))
              .map((item, i) => (
                <Coin
                  item={item}
                  priceColor={
                    item.price_change_percentage_7d_in_currency == 0
                      ? bkgStyle.darkModetitleColor
                      : item.price_change_percentage_7d_in_currency > 0
                      ? 'green'
                      : 'red'
                  }
                  toggleModal={toggleModal}
                />
              ))}
          </ScrollView>
        </View>
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

export default SearchScreen;
