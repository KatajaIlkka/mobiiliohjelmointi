import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Picker, Image } from 'react-native';

export default class toeuros extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading: true, sum: '', currency: '', data: '', converted: 0};
  }

  componentDidMount(){
    this.getRates()
  }

  getRates(){
    const url = 'https://api.fixer.io/latest';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) =>  {
      this.setState({
        data: responseJson.rates});
      })
      .catch((error) => {
        Alert.alert(error);
      });
    }


    convertToEuros = () => {
      let data = this.state.currency;
      let toConvert = this.state.sum;
      let convertedSum = toConvert / data;
      convertedSum = convertedSum.toFixed(2);
      this.setState({converted : convertedSum});


    }

    render() {
      return (
        <View style={styles.container}>
        <Image
        source={{ uri: 'http://www.scheidegger-moebel.ch/203-0-Dank+tiefen+Euro+so+guenstig+wie+noch+nie.html?rex_resize=618c__404h__euro.jpg' }}
        style={{ height: 140, width: 200 }}
        />
        <Text style={{fontSize: 20}}>Convert foreign currencies to euros</Text>

        <View style={styles.buttons}>
        <Text>{this.state.converted}€ </Text>
        </View>

        <View style={styles.buttons}>
        <TextInput style={{width: 70}} placeholder='Ammount' keyboardType='numeric' onChangeText={(sum) => this.setState({sum})} value={this.state.sum} />

        <Picker style={{width: 100}}
        selectedValue={this.state.currency}
        onValueChange={(itemValue)=> this.setState({currency: itemValue})}>
        <Picker.Item label ="Choose a currency" value='0' />
        <Picker.Item label ="AUD - Australian Dollar" value={this.state.data.AUD} />
        <Picker.Item label ="BGN - Bulgarian Lev" value={this.state.data.BGN} />
        <Picker.Item label ="BRL - Brazilian Real" value={this.state.data.BRL} />
        <Picker.Item label ="CAD - Canadian Dollar" value={this.state.data.CAD} />
        <Picker.Item label ="CHF - Swiss Franc" value={this.state.data.CHF} />
        <Picker.Item label ="CNY - Chinese Yuan" value={this.state.data.CNY} />
        <Picker.Item label ="CZK - Czech Koruna" value={this.state.data.CZK} />
        <Picker.Item label ="DKK - Danish Krone" value={this.state.data.DKK} />
        <Picker.Item label ="GBP - British Pound" value={this.state.data.GBP} />
        <Picker.Item label ="HKD - Hong Kong Dollar" value={this.state.data.HKD} />
        <Picker.Item label ="HRK - Croatian Kuna" value={this.state.data.HRK} />
        <Picker.Item label ="HUF - Hungarian Forint" value={this.state.data.HUF} />
        <Picker.Item label ="IDR - Indonesian Rupiah" value={this.state.data.IDR} />
        <Picker.Item label ="ILS - Israeli Shekel" value={this.state.data.ILS} />
        <Picker.Item label ="INR - Indian Rupee" value={this.state.data.INR} />
        <Picker.Item label ="ISK - Icelandic Krona" value={this.state.data.ISK} />
        <Picker.Item label ="JPY - Japanese Yen" value={this.state.data.JPY} />
        <Picker.Item label ="KRW - South Korean Won" value={this.state.data.KRW} />
        <Picker.Item label ="MXN - Mexican Peso" value={this.state.data.MXN} />
        <Picker.Item label ="MYR - Malaysian Ringgit" value={this.state.data.MYR} />
        <Picker.Item label ="NOK - Norwegian Krone" value={this.state.data.NOK} />
        <Picker.Item label ="NZD - New Zealand Dollar" value={this.state.data.NZD} />
        <Picker.Item label ="PHP - Philippine Piso" value={this.state.data.PHP} />
        <Picker.Item label ="PLN - Polish Zloty" value={this.state.data.PLN} />
        <Picker.Item label ="RON - Romanian Leu" value={this.state.data.RON} />
        <Picker.Item label ="RUB - Russian Ruble" value={this.state.data.RUB} />
        <Picker.Item label ="SEK - Swedish Krona" value={this.state.data.SEK} />
        <Picker.Item label ="SGD - Singapore Dollar" value={this.state.data.SGD} />
        <Picker.Item label ="THB - Thai Baht" value={this.state.data.THB} />
        <Picker.Item label ="TRY - Turkish Lira" value={this.state.data.TRY} />
        <Picker.Item label ="USD - US Dollar" value={this.state.data.USD} />
        <Picker.Item label ="ZAR - South African Rand" value={this.state.data.ZAR} />
        </Picker>

        </View>
        <Button onPress={this.convertToEuros} title="Convert to euros"/>
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
      paddingTop: 100,
      paddingBottom: 100
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  });
