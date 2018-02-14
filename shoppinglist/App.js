import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);this.state= {newitem:'', data:[]}
  }

  emptylist= () =>{
    this.setState({data:[]});
  }

  additem= () =>{
    this.setState({data:[...this.state.data, {key: this.state.newitem}], newitem : ''});
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={{flex:1, justifyContent:'flex-end'}}>
      <TextInput
      style={{width:200  , borderColor: 'gray',   borderWidth:1}}
      onChangeText={(newitem) => this.setState({newitem})}
      value={this.state.newitem}/>
      </View>

      <View style={{flex: .5, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
      <Button onPress={this.additem}title="add"/>
      <Button onPress={this.emptylist}title="Clear"/>
      </View>

      <View style={{flex:3, justifyContent:'flex-start'}}>
      <FlatList data={this.state.data}renderItem={({item}) =>
      <Text>{item.key}</Text>}
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
