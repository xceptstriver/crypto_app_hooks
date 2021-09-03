import React from 'react';
import {Text, View} from 'react-native';
import {bkgStyle} from '../constants/index';

const Headerbar = props => {
  return (
    <View style={{justifyContent: 'flex-end'}}>
      <Text style={{color: bkgStyle.darkModetitleColor, fontSize: 16}}>
        {props.title}
      </Text>
    </View>
  );
};

export default Headerbar;
