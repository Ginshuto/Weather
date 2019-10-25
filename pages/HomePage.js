import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  RefreshControl
} from "react-native";
import WeatherService from "../services/weather-service";
import Loading from "../components/loading";
import { createStore } from "redux";
import { connect } from "react-redux";
import mainReducer from "../reducers/reducers";
import { ImgWeather } from "./FavoritesPage";
// import LinearGradient from "react-native-linear-gradient";

class HomePage extends React.Component {
  serv = new WeatherService();
  constructor(props) {
    super(props);
  }
  state = {
    wea: null,
    me: null,
    refreshing: false
  };
  refresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem("FavCity").then(data => {
      this.setState({ refreshing: false });
    });
  }
  componentDidMount() {
    const action = { type: "WEATHER_HOME", value: "troyes" };
    this.props.dispatch(action);
    // coordonnées géolocalisées

    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        console.log(lat);
        const lon = position.coords.longitude;
        console.log(lon);
        this.serv
          .getWeatherMe(lat, lon)
          .then(resp => {
            this.setState({ me: resp.data });
          })
          .catch(err => {
            console.log(err);
          });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
      this.serv
        .getWeatherHome("marseille")
        .then(resp => {
          this.setState({ wea: resp.data });
        })
        .catch(err => {
          alert(err);
        });
      // Tentative La classe
      
      // AsyncStorage.getItem("FavCity").then(city => {
      //   this.serv
      //     .getWeatherHome(city)
      //     .then(resp => {
      //       this.setState({ wea: resp.data });
      //     })
      //     .catch(err => {
      //       alert(err);
      //     });
      //   this.refresh();
      // });
  }
  render() {
    return this.state.wea != null ? (
      <View style={{ flex: 1 }}>
        <View
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
            />
          }
          style={[
            styles[this.state.wea.weather.main],
            {
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "yellow"
            }
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>Ville Favorite</Text>
          <Text style={[styles[this.state.wea.weather.main]]}>
            {this.state.wea.name}
          </Text>
          <Text style={[styles[this.state.wea.weather.main]]}>
            {this.state.wea.weather[0].main}
          </Text>
          <Text style={[styles[this.state.wea.weather.main]]}>
            Température actuelle : {this.state.wea.main.temp}°C
          </Text>
          <Text style={[styles[this.state.wea.weather.main]]}>
            Température minimale du jour : {this.state.wea.main.temp_min}°C
          </Text>
          <Text style={[styles[this.state.wea.weather.main]]}>
            Température maximale du jour : {this.state.wea.main.temp_max}°C
          </Text>
          <Text style={[styles[this.state.wea.weather.main]]}>
            Taux d'humidité : {this.state.wea.main.humidity}%
          </Text>
          <Text style={[styles[this.state.wea.weather.main]]}>
            Vitesse du vent : {this.state.wea.wind.speed} km/h
          </Text>
          <Sunrise time={this.state.wea.sys.sunrise} />
          <Sunset time={this.state.wea.sys.sunset} />
          <ImgWeather icon={this.state.wea.weather[0].icon} />
        </View>
        {this.state.me != null ? (
          <View
            style={[
              styles[this.state.me.weather.main],
              {
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "yellow"
              }
            ]}
          >
            <Text style={{ fontWeight: "bold" }}>Ma Position</Text>
            <Text style={[styles[this.state.me.weather.main]]}>
              {this.state.me.name}
            </Text>
            <Text style={[styles[this.state.me.weather.main]]}>
              {this.state.me.weather[0].main}
            </Text>
            <Text style={[styles[this.state.me.weather.main]]}>
              Température actuelle : {this.state.me.main.temp}°C
            </Text>
            <Text style={[styles[this.state.me.weather.main]]}>
              Température minimale du jour : {this.state.me.main.temp_min}°C
            </Text>
            <Text style={[styles[this.state.me.weather.main]]}>
              Température maximale du jour : {this.state.me.main.temp_max}°C
            </Text>
            <Text style={[styles[this.state.me.weather.main]]}>
              Taux d'humidité : {this.state.me.main.humidity}%
            </Text>
            <Text style={[styles[this.state.me.weather.main]]}>
              Vitesse du vent : {this.state.me.wind.speed} km/h
            </Text>
            <Sunrise time={this.state.me.sys.sunrise} />
            <Sunset time={this.state.me.sys.sunset} />
            <ImgWeather icon={this.state.me.weather[0].icon} />
          </View>
        ) : (
          <Loading displayColor="red">
            <Text>Connexion au serveur...</Text>
          </Loading>
        )}
      </View>
    ) : (
      <Loading displayColor="red">
        <Text>Connexion au serveur...</Text>
      </Loading>
    );
  }
}

const Sunrise = props => {
  const dt = new Date(props.time * 1000);
  return <Text>Lever du Soleil : {`${dt.getHours()}h${dt.getMinutes()}`}</Text>;
};

const Sunset = props => {
  const dt = new Date(props.time * 1000);
  return (
    <Text>Coucher du Soleil : {`${dt.getHours()}h${dt.getMinutes()}`}</Text>
  );
};
function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => {
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
const styles = StyleSheet.create({
  Clear: {
    backgroundColor: "blue",
    color: "yellow"
  },
  Sunny: {
    backgroundColor: "yellow",
    color: "blue"
  },
  Clouds: {
    backgroundColor: "grey"
  }
});
