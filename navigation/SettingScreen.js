import React from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class SettingScreen extends React.Component{
  static navigationOptions= {title: 'Settings'};
  render (){
    const{params} = this.props.navigation.state;
      return(
        <View style={styles.container}>
        <Text>Welcometo settings{params.user}</Text>
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
