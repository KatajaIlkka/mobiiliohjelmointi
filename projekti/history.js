import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {StackNavigator} from 'react-navigation';
import {MapView, Location, Permissions} from 'expo';

import { Card } from 'react-native-elements';

export default class History extends React.Component{
  static navigationOptions= {title: 'Map',
        headerStyle: {
        backgroundColor: '#811a64',
      },
  };

  constructor(props){
        super(props);
        this.state = {address: '', locationRs: null, locationResultLat: 0, locationResultLon: 0, currentAddr:''};
    }

    componentDidMount(){
        this.getLocation();
    }


    getLocation = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('No permission!')
        } else {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({locationResult: JSON.stringify(location),
                          locationResultLat: location.coords.latitude,
                          locationResultLon: location.coords.longitude
            });
        }
      this.getAddress();
    };

    getAddress = () => {
        let currentLat = this.state.locationResultLat,
            currentLon = this.state.locationResultLon
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ currentLat +','+ currentLon +'&key=AIzaSyBzr6RzA76qXoGrpNRA5c1mHhMAbhlMGO4';
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
             currentAddr: responseJson.results[0].address_components[1].long_name +' '+
                          responseJson.results[0].address_components[0].long_name +', '+
                          responseJson.results[0].address_components[2].long_name
            });
        }) .catch((error) => {
                  Alert.alert(error);
                });
    }


  render (){
    const{params} = this.props.navigation.state;
      return(
      <View style={styles.container}>

        <MapView
          style={{flex: 1}}
          region={{
          latitude: this.state.locationResultLat,
          longitude: this.state.locationResultLon,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
          }} >
          <MapView.Marker
          coordinate={{latitude: this.state.locationResultLat,
                      longitude: this.state.locationResultLon}}
                      />
        </MapView>

        <Card title="My progress">
         <Text>Current address: {this.state.currentAddr}</Text>
         <Text>Drinks: {params.amount}</Text>
         <Text>timeDrinking: {params.timeDrinking} hours</Text>
         <Text>Blood alcLevel: {params.blood}  ‰</Text>
         <Text>Sober in: {params.timeSober}</Text>
        </Card>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      paddingTop: 20,
      paddingBottom: 20
  },
});
