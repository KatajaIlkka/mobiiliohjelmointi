import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';

const MyApp = StackNavigator({
  Home: {screen: HomeScreen},
  Settings: {screen: SettingScreen}
});

export default class App extends React.Component{
  render() {
    return <MyApp/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
