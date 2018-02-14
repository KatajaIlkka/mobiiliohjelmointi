import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);this.state= {counter: 0, number: '', guess: '', random: Math.floor(Math.random() * 100) + 1}
  }


  makeGuess=() => {
    if( parseInt(this.state.number) > this.state.random ){
      this.setState({guess:'Your guess ' + parseInt(this.state.number) + ' is too high'});
      this.setState({counter:this.state.counter + 1});
    }
    else if ( parseInt(this.state.number) < this.state.random ){
      this.setState({guess:'Your guess ' + parseInt(this.state.number) + ' is too low'});
      this.setState({counter:this.state.counter + 1});
    }
    else if ( parseInt(this.state.number) == this.state.random ){
      this.setState({guess:'Hoorray!! Your guess ' + parseInt(this.state.number) + ' was spot on!'});
      this.setState({counter:this.state.counter + 1});
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={{fontSize: 20}}>{this.state.guess}</Text>
      <Text style={{fontSize: 10}}>Guesses: {this.state.counter}</Text>

      <Text>Guess a number between 1-100</Text>

      <TextInput
      style={{width:200, borderColor: 'gray', borderWidth:1}}
      keyboardType = 'numeric'
      onChangeText={(number) => this.setState({number})}
      value={this.state.number}/>

      <Button  onPress={this.makeGuess} title="MAKE GUESS"/>
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
