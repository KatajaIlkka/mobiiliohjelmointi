import React from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions= {title: 'Home',};
    render() {
      const{navigate} = this.props.navigation;
      return(
        <View>
        <Text>Helloscreen</Text>
        <Button onPress={() => navigate('Settings', {user: 'Ilkka'})} title="Settings"/>
        </View>
      );
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
