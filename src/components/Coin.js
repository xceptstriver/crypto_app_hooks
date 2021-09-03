import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {bkgStyle} from '../constants/index';
import {LineChart} from 'react-native-chart-kit';
const Coin = props => {
  return (
    <TouchableOpacity onPress={() => props.toggleModal(props.item)}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 8,
          marginBottom: 10,
          // backgroundColor: '#fff',
        }}>
        {/* Coins */}
        <View
          style={{
            flex: 1.5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: props.item.image}}
            style={{width: 20, height: 20}}
          />
          <Text
            style={{
              fontWeight: '600',
              marginLeft: 10,
              color: bkgStyle.darkModetxtColor,
              fontSize: 16,
            }}>
            {props.item.name}
          </Text>
        </View>
        {/* Line chart */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <LineChart
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withDots={false}
            withInnerLines={false}
            withVerticalLines={false}
            data={{
              labels: props.item.sparkline_in_7d.price.map(_ => _.x),
              datasets: [
                {
                  data: props.item.sparkline_in_7d.price.map(_ => _.y),
                },
              ],
            }}
            width={100}
            height={60}
            chartConfig={{
              color: () => props.priceColor,
            }}
            bezier
            style={{
              paddingRight: 0,
            }}
          />
        </View>
        {/* Figures */}
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 12}}>
            $
            {props.item.current_price
              ?.toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {props.item.price_change_percentage_7d_in_currency != 0 && (
              <Image
                source={require('../Images/up-arrow.png')}
                style={{
                  width: 10,
                  height: 10,
                  tintColor: props.priceColor,
                  transform:
                    props.item.price_change_percentage_7d_in_currency > 0
                      ? [{rotate: '45deg'}]
                      : [{rotate: '125deg'}],
                }}
              />
            )}
            <Text style={{marginLeft: 5, color: props.priceColor, fontSize: 8}}>
              {props.item.price_change_percentage_7d_in_currency.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Coin;
