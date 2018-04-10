import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('shopdb.db');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {product:'', ammount:'', shopList:[]};
  }

  componentDidMount() {
    // Create table shop
    db.transaction(tx => {
      tx.executeSql('create table if not exists shop (id integer primary key not null, product text, ammount text);');
    });
    this.updateList();
  }

  //Save new product
  saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shop (product, ammount) values (?, ?)', [this.state.product, this.state.ammount]);
      }, null, this.updateList)
  }

  //Update shoplist
  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shop', [], (_, { rows }) =>
        this.setState({shopList: rows._array, product:'', ammount:''})
        );
    });
  }

  //Remove item from list
  deleteItem = (id) => {
    db.transaction( tx => {
      tx.executeSql('delete from shop where id = ?;', [id]);
    }, null, this.updateList
    )
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder='Tuote' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(product) => this.setState({product})}
          value={this.state.product}/>
        <TextInput placeholder='Määrä' style={{ marginTop: 5, marginBottom: 10,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(ammount) => this.setState({ammount})}
          value={this.state.ammount}/>
        <Button  onPress={this.saveItem} title="Lisää tuote" />
        <Text style={{marginTop: 30, fontSize: 20}}>Ostoslista</Text>
        <FlatList
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id}
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.product}, {item.ammount} </Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => this.deleteItem(item.id)}>poista</Text>
          </View>} data={this.state.shopList} ItemSeparatorComponent={this.listSeparator}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
