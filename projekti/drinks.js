import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TouchableHighlight } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state= {amount:0, message:'', curH:0, curM:0, newH:0, newM:0, diff:0, timePassedH:0, timePassedM:0, newTimeH:0, newTimeM:0, curTimeH:0, curTimeM:0, timePassedCalc:0, timeDrinking:0, blood:0, timeSober:0 };
  }

  saveDrink = () => {
    this.setState({amount: this.state.amount + 1}, this.getTime)
  }

  reset = () => {
  Alert.alert(
    'Reset everything.',
    'Are you sure?',
    [
      {text: 'Cancel', onPress: () => this.setState(() => {
      return {}
      })},

      {text: 'OK', onPress: () => this.setState(() => {
      return {amount:0, message:'', curH:0, curM:0, newH:0, newM:0, diff:0, timePassedH:0, timePassedM:0, newTimeH:0, newTimeM:0, curTimeH:0, curTimeM:0, timePassedCalc:0, timeDrinking:0, blood:0, timeSober:0}
      })},
    ])
  }

  getTime= () => {
    if ( this.state.amount == 1) {
      var curTime = new Date()
          const  curH = curTime.getHours()
          const  curM = curTime.getMinutes()
          const  curD = curTime.getDate()

      this.setState({curTimeH: curH, curTimeM: curM, curTimeD: curD})
    } else if ( this.state.amount >= 2) {
      var newTime = new Date(),
            newH = newTime.getHours(),
            newM = newTime.getMinutes(),
            newD = newTime.getDate();

      this.setState({newTimeH: newH, newTimeM:newM, newTimeD: newD}, this.timeDiff)
    }
    }

  timeDiff=() => {
      if (parseInt(this.state.curTimeD) < parseInt(this.state.newTimeD)) {
      var timePassedH = parseInt(this.state.curTimeH) -(parseInt(this.state.newTimeH) + 24);
      } else {
      timePassedH = parseInt(this.state.curTimeH) -parseInt(this.state.newTimeH);
      }
      var timePassedM = (parseInt(this.state.curTimeM) -parseInt(this.state.newTimeM) + 20) / 60;

      const timePassedCalc = timePassedH + timePassedM
      this.setState({timeDrinking: timePassedCalc.toFixed(2)}, this.alcoholLevel)

    }

    alcoholLevel = () => {
      const{params} = this.props.navigation.state;
      var alc = (12 * this.state.amount) / (params.k * params.weight)
      var alcLevel = alc - (params.ppm * this.state.timeDrinking)
      if (alcLevel <= 0) {
       this.setState({blood: 0})
      } else
      this.setState({blood: alcLevel.toFixed(2)}, this.getSober)
    }

    getSober = () => {
      const{params} = this.props.navigation.state;
      var sober = (this.state.blood) / (1 / params.inOneHour)
      this.setState ({timeSober: sober.toFixed(1) + ' hours'})
    }



  render() {
    const{navigate} = this.props.navigation;
    const{params} = this.props.navigation.state;
    return (
      <View style={styles.container}>

      <View style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width: 250}}>
      <Button onPress={() => navigate('History', {amount:this.state.amount, timeDrinking:this.state.timeDrinking, blood:this.state.blood, timeSober: this.state.timeSober })} title="How drunk am I?"/>
      </View>

      <View style={{flex: 2, alignItems:'flex-start', justifyContent:'space-around', }}>
        <TouchableHighlight onPress={() => this.saveDrink()}>
          <Image style={styles.button} source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/13/11/34/owl-158415_960_720.png' }} />
        </TouchableHighlight>
       </View>

      <View style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width: 180}}>
        <Button  onPress={this.saveDrink} title="Beer" />
        <Button  onPress={this.saveDrink} title="Shot" />
      </View>

      <View>
        <Text style={styles.text}>Drinks: {this.state.amount}</Text>
        <Text style={styles.text2}>Gender: {params.gender}</Text>
        <Text style={styles.text2}>Weight: {params.weight}</Text>
      </View>

        <Button  onPress={this.reset} title="Forget this night ever happened!"  />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#811a64',
    alignItems: 'center',
    justifyContent: 'center'
  },
    button: {
    alignItems: 'center',
    padding: 10,
    height: 220,
    width: 250
  },
    text: {
    alignItems: 'center',
    fontSize: 30
  },
    text2: {
    alignItems: 'center',
    fontSize: 20
  },

  });
