import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Calculator extends React.Component {
  static navigationOptions= {title: 'Calculator',};

  constructor(props) {
    super(props);this.state= {top:'', bottom:'', sum:'', result:'', data:[], add:'', 	subtraction:'', subt:''}
  }

  plus= () =>{
    const sum = parseInt(this.state.top) + parseInt(this.state.bottom);
    this.setState({result: sum});
    const text = this.state.top +'+'+ this.state.bottom +'='+ sum;
    this.setState({data:[...this.state.data, {key: text}]});
  }

  minus=() =>{
    const sum = parseInt(this.state.top) - parseInt(this.state.bottom)
    this.setState({result: sum});
    const text = this.state.top +'-'+ this.state.bottom +'='+ sum;
    this.setState({data:[...this.state.data, {key: text}]});
  }

    render() {
      const{navigate} = this.props.navigation;
      return(

        <View  style={styles.container}>

        <View style={{flex:1, justifyContent:'center'}}>
          <TextInput
          style={{width:200, borderColor: 'gray', borderWidth:1, marginBottom: 5}}
          keyboardType = 'numeric'
          onChangeText={(top) => this.setState({top})}
          value={this.state.top}/>

          <TextInput
          style={{width:200, borderColor: 'gray', borderWidth:1}}
          keyboardType = 'numeric'
          onChangeText={(bottom) => this.setState({bottom})}
          value={this.state.bottom}/>
        </View>

        <View style={{flex: .5, flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', width: 180}}>
          <Button onPress={this.plus} title="  +  "/>

          <Button onPress={this.minus} title="  -  "/>

          <Button onPress={() => navigate('History', {user:this.state.data })} title="History"/>
        </View>

        <View style={{flex: 3, flexDirection:'row', alignItems:'flex-start'}}>
          <Text>Result: {this.state.result}</Text>
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
