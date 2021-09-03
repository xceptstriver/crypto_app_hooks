import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {bkgStyle} from '../constants/index';
import {SAMPLE_DATA} from '../constants/index';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
// import 'intl';
// import 'intl/locale-data/jsonp/en';
import {useSharedValue} from 'react-native-reanimated';
const {width: SIZE} = Dimensions.get('window');

const NewChartComponent = props => {
  const priceColor =
    props.priceChangePercentage7d == 0
      ? bkgStyle.darkModetitleColor
      : props.priceChangePercentage7d > 0
      ? 'green'
      : 'red';
  const latestCurrentPrice = useSharedValue(props.currentPrice);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    latestCurrentPrice.value = props.currentPrice;

    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [props.currentPrice]);

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      const formattedValue = `$${parseFloat(latestCurrentPrice.value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      return formattedValue;
    }

    const formattedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    return formattedValue;
  };
  const format = () => {
    return '';
  };

  useEffect(() => {
    console.log('propsData', props.sparkline);
  }, []);

  return (
    <ChartPathProvider
      data={{
        points: props.sparkline,
        smoothingStrategy: 'bezier',
      }}>
      <View style={styles.chartWrapper}>
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{uri: props.logoUrl}} style={styles.image} />
              <Text style={styles.subtitle}>
                {props.name} ({props.symbol.toUpperCase()})
              </Text>
            </View>
            <Text style={styles.subtitle}>7d</Text>
          </View>
          <View style={styles.lowerTitles}>
            <ChartYLabel format={formatUSD} style={styles.boldTitle} />

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 8,
                justifyContent: 'space-between',
              }}>
              {props.priceChangePercentage7d != 0 && (
                <Image
                  source={require('../Images/up-arrow.png')}
                  style={{
                    marginRight: 4,
                    marginTop: 4,
                    width: 10,
                    height: 10,
                    tintColor: priceColor,
                    transform:
                      props.priceChangePercentage7d > 0
                        ? [{rotate: '45deg'}]
                        : [{rotate: '125deg'}],
                  }}
                />
              )}
              <Text style={[styles.title, {color: priceColor}]}>
                {props.priceChangePercentage7d.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
        {chartReady ? (
          <View style={styles.chartLineWrapper}>
            <ChartPath height={SIZE / 2} stroke="green" width={SIZE} />
            <ChartDot style={{backgroundColor: '#6930C3'}} />
          </View>
        ) : null}
      </View>
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 4,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#A9ABB1',
  },
  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 10,
  },
});

{
  /* <Text style={{color: '#000', fontSize: 12}}>
              $
              {props.currentPrice
                ?.toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text> */
}

//   const formatUSD = value => {
//     'worklet';
//     // console.log('hehe');
//     // if (value === '') {
//     //   return `$ ${props?.currentPrice}`;
//     // }
//     // return `$ ${value.toLocaleString('en-US', {
//     //   currency: 'USD',
//     // })}`;
//   };
// let formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
// });

export default NewChartComponent;
