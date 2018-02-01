import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);this.state= {top:'', bottom:'', result:''}
  }

  plus= () =>{
    this.setState({result: parseInt(this.state.top) + parseInt(this.state.bottom)}
    );
  }

  minus=() =>{
    this.setState({result: parseInt(this.state.top) - parseInt(this.state.bottom)}
    );
  }

  render() {
    return (
      <View style={styles.container}>

      <View>
      <Text>Result: {this.state.result}</Text>
      </View>

        <View>
          <TextInput
          style={{width:200, borderColor: 'gray', borderWidth:1}}
          keyboardType = 'numeric'
          onChangeText={(top) => this.setState({top})}
          value={this.state.top}/>

          <TextInput
          style={{width:200, borderColor: 'gray', borderWidth:1}}
          keyboardType = 'numeric'
          onChangeText={(bottom) => this.setState({bottom})}
          value={this.state.bottom}/>
        </View>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
          <Button color="green" onPress={this.plus} title="+"/>

          <Button color="red" onPress={this.minus} title="-"/>
        </View>
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
