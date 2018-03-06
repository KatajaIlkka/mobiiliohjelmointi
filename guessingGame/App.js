import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);this.state= {counter: 0, number: '', guess: '', random: Math.floor(Math.random() * 100) + 1, highscore: 'Not set'}
  }

   componentDidMount() {
    AsyncStorage.clear()
  }

   getScore = () => {
    AsyncStorage.getItem('highscore').then((value) => this.setState({ 'highscore': value}));
  }

    compareScore = () => {
    if (this.state.highscore == 'Not set') {
      AsyncStorage.setItem('highscore', (this.state.counter).toString());
      this.getScore();
    }

    else if ((this.state.counter +1) < parseInt(this.state.highscore)) {
      AsyncStorage.setItem('highscore', (this.state.counter).toString());
      this.getScore();
    }

  }

  makeGuess=() => {
    if( parseInt(this.state.number) > this.state.random ){
      this.setState({guess:'Your guess ' + parseInt(this.state.number) + ' is too high'});
      this.setState({counter:this.state.counter + 1, number:''});
    }

    else if ( parseInt(this.state.number) < this.state.random ){
      this.setState({guess:'Your guess ' + parseInt(this.state.number) + ' is too low'});
      this.setState({counter:this.state.counter + 1, number:''});
    }

    else if ( parseInt(this.state.number) == this.state.random ){
      const score = this.state.counter
      Alert.alert('Hoorray!! Your guess ' + parseInt(this.state.number) + ' was spot on! (number of guesses: ' + score + ')');
      this.compareScore();
      this.setState({number: '', counter: 0, guess: '', random: Math.floor(Math.random() * 100) + 1});
    }
  }


  render() {
    return (
      <View style={styles.container}>
      <Text>High score: {this.state.highscore}</Text>
      <Text>{this.state.random}</Text>
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
