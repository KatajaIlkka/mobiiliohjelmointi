import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {StackNavigator} from 'react-navigation';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

export default class App extends React.Component {
  static navigationOptions= {title: 'Userinfo',
        headerStyle: {
        backgroundColor: '#811a64',
      },
  };

  constructor(props) {
        super(props)
        this.state = { gender: '', weight:'' }
    }

    onSelect(index, value){
        this.setState({
        radio: `${value}`
        })
    }

    submit= () =>{
    this.setState({gender: this.state.radio, result: this.state.weight});
      if (this.state.radio == 'Male') {
        this.setState({k: 0.75, ppm: 0.1333, inOneHour: 7.7})
      } else if (this.state.radio == 'Female') {
        this.setState({k: 0.66, ppm: 0.1515, inOneHour: 6.6})
      }
  }


  render() {
    const{navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Button onPress={() => navigate('Drinks', { gender:this.state.gender, weight: this.state.weight, k: this.state.k, ppm: this.state.ppm, inOneHour: this.state.inOneHour })} title="Continue"/>
      <Text style={styles.text}>Gender:</Text>
          <RadioGroup onSelect = {(index, value) => this.onSelect(index, value)} >
          <RadioButton value={'Male'} >
              <Text>Male</Text>
          </RadioButton>
          <RadioButton value={'Female'}>
              <Text>Female</Text>
          </RadioButton>
          </RadioGroup>

        <View style={styles.container}>
        <Text style={styles.text}>Weight (kg):</Text>
          <TextInput
          style={{width:200, borderColor: 'gray', borderWidth:1, marginBottom: 5}}
          keyboardType = 'numeric'
          onChangeText={(weight) => this.setState({weight})}
          value={this.state.weight}/>

          <Button onPress={this.submit} title="Submit"/>

          <Text style={styles.text}>Gender: {this.state.gender}</Text>
          <Text style={styles.text}>Weight: {this.state.result} kg</Text>
        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20
    },
    text: {
        padding: 10,
        fontSize: 14,
    },
})
