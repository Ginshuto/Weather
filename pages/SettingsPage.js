import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  AsyncStorage
} from "react-native";

class SettingsPage extends React.Component {
  state = {
    cityNameToDelete: null
  };
  onDeleteFavoritesPress() {
    AsyncStorage.removeItem("cities").then(() => alert("Favoris supprimés !"));
  }
  ChangeText(text) {
    this.setState({ cityNameToDelete: text });
  }
  onPressDeleteFav() {
    AsyncStorage.getItem("cities").then(data => {
      let tab = [];
      if (data != null) {
        tab = JSON.parse(data);
      }
      let number = this.state.cityNameToDelete - 1;
      tab.splice(number, 1);
      AsyncStorage.setItem("cities", JSON.stringify(tab))
        .then(() => {})
        .catch(err => {
          alert(err);
        });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Paramètres</Text>
        <Button
          title="Supprimer les Favoris"
          onPress={() => this.onDeleteFavoritesPress()}
        />
        <TextInput
          style={{ backgroundColor: "white" }}
          placeholder="Choississez la position de la ville dans la liste"
          keyboardType="numeric"
          onChangeText={text => this.ChangeText(text)}
          type="numeric"
        />
        <Button
          title="Supprimer le favori"
          onPress={() => this.onPressDeleteFav()}
        />
      </View>
    );
  }
}

export default SettingsPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: ""
  }
});
