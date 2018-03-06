import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class History extends React.Component{
  static navigationOptions= {title: 'History'};
  render (){
    const{params} = this.props.navigation.state;
      return(
        <View style={styles.container}>
        <Text>History:</Text>
          <FlatList data={params.user}renderItem={({item}) =>
          <Text>{item.key}</ Text>}
          />
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
