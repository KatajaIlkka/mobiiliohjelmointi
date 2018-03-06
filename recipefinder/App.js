import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar } from 'react-native';

//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: [], ingridient: ''};
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingridient;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({results: responseJson});
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
        <StatusBar hidden={true} />
        <FlatList
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Text style={{fontSize: 18}}>{item.title}</Text>} data={this.state.jobs}
          ItemSeparatorComponent={this.listSeparator} />
        <TextInput style={{fontSize: 18, width: 200}} placeholder='Ingridient' onChangeText={(ingridient) => this.setState({ingridient})} />
        <Button title="Find" onPress={this.getRecipes} />
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
