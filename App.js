import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Routes from './src/routes/index';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
