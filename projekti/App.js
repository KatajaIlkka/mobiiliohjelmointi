import React from 'react';
import {StackNavigator} from 'react-navigation';
import Drinks from './drinks';
import History from './history';
import Userinfo from './userinfo'

const MyApp = StackNavigator({
  Userinfo: {screen: Userinfo},
  Drinks: {screen: Drinks},
  History: {screen: History}
});

export default class App extends React.Component{
  render() {
    return <MyApp/>;
  }
}
