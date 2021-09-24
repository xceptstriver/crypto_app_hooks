import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {bkgStyle} from '../constants/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Exchange = props => {
  const renderStar = trust_score => {
    let starList = [];
    for (let i = 0; i < trust_score / 2; i++) {
      starList.push(<Icon key={i} name="star" style={styles.starIcon} />);
    }
    return starList;
  };

  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 8,
          marginBottom: 10,
          height: 50,
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
              fontFamily: 'OpenSans-Regular',
            }}>
            {props.item.name}
          </Text>
        </View>
        {/* Trust score rating */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text>{renderStar(props.item.trust_score)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  starIcon: {
    color: 'green',
    fontSize: 22,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});

export default Exchange;
