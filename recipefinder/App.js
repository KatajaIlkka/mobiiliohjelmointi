import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Alert, Text } from 'react-native';
import { List, ListItem } from "react-native-elements";

//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recepies: [], ingridient: ''};
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingridient;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({recepies: responseJson.results});
    })
    .catch((error) => {
      Alert.alert(error);
    });
  }

  listSeparator = () => {
    return (
      <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>
      Search by ingridient! </Text>
      <View style={styles.inputs}>
      <TextInput onChangeText={(ingridient) => this.setState({ingridient})} />
      </View>
      <View>
      <Button onPress={this.getRecipes} title="Search"/>
      </View>
      <View>
      </View>
      <Text> Found recepies: </Text>
      <List>
      <FlatList
      data={this.state.recepies}
      keyExtractor={item => item.title}
      renderItem={({item}) => (
        <ListItem
        roundAvatar
        title={item.title}
        avatar={{ uri: item.thumbnail }}
        />
      )}
      />
      </List>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 100
  },
  text: {
    textAlign: 'center'
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    width: 150,
    justifyContent: 'center',
    alignSelf: 'center'
  },


});
