import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PortfolioScreen = () => {
  return (
    <SafeAreaView style={{color: '#fff', flex: 1}}>
      <Text style={{color: '#000', fontSize: 16}}>PortfolioScreen</Text>
    </SafeAreaView>
  );
};

export default PortfolioScreen;
