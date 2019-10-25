import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import WeatherService from "../services/weather-service";

export default class AddFavoritesPage extends Component {
  serv2 = new WeatherService();

  static navigationOptions = {
    title: "Ajouter une Ville"
  };

  state = {
    cityName: ""
  };

  constructor(props) {
    super(props);
  }
  changeText(text) {
    this.setState({ cityName: text });
  }
  onPressAdd() {
    AsyncStorage.getItem("cities").then(data => {
      let tab = [];
      if (data != null) {
        tab = JSON.parse(data);
      }
      if (tab.length < 15) {
        this.serv2
          .getWeatherHome(this.state.cityName)
          .then(res => {
            let city = {
              city: res.data.name,
              temp: res.data.main.temp,
              main: res.data.weather[0].main,
              iconImg: res.data.weather[0].icon
            };
            tab.push(city);
            AsyncStorage.setItem("cities", JSON.stringify(tab))
              .then(() => {
                this.props.navigation.goBack();
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert("La ville n'existe pas !");
          });
      } else {
        alert("Veuillez supprimer une ville.");
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
        <TextInput
          style={{ backgroundColor: "white" }}
          placeholder="Rentrez le nom d'une Ville"
          onChangeText={text => this.changeText(text)}
        ></TextInput>
        <Button title="Ajouter" onPress={() => this.onPressAdd()} />
      </View>
    );
  }
}
