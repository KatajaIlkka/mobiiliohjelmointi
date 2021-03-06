import React from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Calculator from './Calculator';
import History from './History';

const MyApp = StackNavigator({
  Calculator: {screen: Calculator},
  History: {screen: History}
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
