import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);this.state= {top:'', bottom:'', sum:'', result:'', data:[], text:'', history:''}
  }

  plus= () =>{
    const sum = parseInt(this.state.top) + parseInt(this.state.bottom);
    this.setState({result: sum});
    const text = this.state.top +'+'+ this.state.bottom +'='+ sum;
    this.setState({history: text});
    this.setState({data:[...this.state.data, {key: this.state.history}]});
  }

  minus=() =>{
    const sum = parseInt(this.state.top) - parseInt(this.state.bottom)
    this.setState({result: sum})
    const text = this.state.top +'-'+ this.state.bottom +'='+ this.state.result
    this.setState({history: text})
    this.setState({data:[...this.state.data, {key: this.state.history}]});
  }

  render() {
    return (
      <View  style={styles.container}>

        <View style={{flex:1, justifyContent:'flex-end'}}>
        <Text>Result: {this.state.result}</Text>
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

        <View style={{flex: .5, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
          <Button color="green" onPress={this.plus} title="  +  "/>

          <Button color="red" onPress={this.minus} title="  -  "/>
        </View>

        <View style={{flex:3, justifyContent:'flex-start'}}>
        <Text>History:</Text>
          <FlatList data={this.state.data}renderItem={({item}) =>
          <Text>{item.key}</ Text>}
          />
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
