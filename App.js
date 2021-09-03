import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Routes from './src/routes/index';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
