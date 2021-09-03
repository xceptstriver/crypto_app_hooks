import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BOTTOM_TAB_SCREENS,
  APP_STACK_SCREENS,
  bkgStyle,
} from '../constants/index';
import Icon from 'react-native-vector-icons/Ionicons';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

//navOptionshandler
const navOptionHandler = () => ({
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
});

const tabBarIcon = (focused, color, route) => {
  let currentScreen = BOTTOM_TAB_SCREENS.find(
    screen => screen.name === route.name,
  );
  let iconName = currentScreen[focused ? 'activeIcon' : 'inactiveIcon'];
  return (
    <>
      <Icon name={iconName} size={28} color={color} />
    </>
  );
};

const Routes = props => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => tabBarIcon(focused, color, route),
        })}
        tabBarOptions={{
          showLabel: false,
          inactiveTintColor: isDarkMode ? '#555' : '#999',
          activeTintColor: isDarkMode ? 'white' : '#6930C3',
          keyboardHidesTabBar: true,
          style: {
            ...styles.tabsNavigator,
            backgroundColor: isDarkMode
              ? bkgStyle.darkModesecBkgColor
              : bkgStyle.secBkgColor,
            bottom: isKeyboardShown ? -10 : 15,
          },
        }}>
        {BOTTOM_TAB_SCREENS.map((screen, key) => (
          <Tab.Screen
            key={key}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="HomeApp">
        <AppStack.Screen
          name="HomeApp"
          component={TabNavigator}
          options={navOptionHandler}
        />
        {APP_STACK_SCREENS.map((screen, key) => (
          <AppStack.Screen
            key={key}
            name={screen.name}
            component={screen.component}
            options={navOptionHandler}
          />
        ))}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabsNavigator: {
    position: 'absolute',
    left: 15,
    right: 15,
    borderRadius: 30,
    borderTopWidth: 0,
    height: 55,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
    overflow: 'hidden',
  },
});

export default Routes;
