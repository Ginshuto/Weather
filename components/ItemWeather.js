import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet,Text } from "react-native";
import WeatherService from "../services/weather-service";
import { ImgWeather } from "../pages/FavoritesPage";
import Loading from "../components/loading";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

export default class itemWeather extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  serv = new WeatherService();

  componentDidMount() {
    this.serv.getWeatherHome(this.props.data).then(resp => {
      this.setState({ weather: resp.data });
    });
  }

  state = {
    weather: null
  };

  deleteFav(index) {
    AsyncStorage.getItem("cities").then(data => {
      let tab = [];
      if (data != null) {
        tab = JSON.parse(data);
      }
      tab.splice(index, 1);
      AsyncStorage.setItem("cities", JSON.stringify(tab))
        .then(() => {
          this.refresh();
        })
        .catch(err => {
          alert(err);
        });
    });
  }

  render() {
    return (
      <SwipeRow leftOpenValue={90} rightOpenValue={-90}>
        <View style={styles.standaloneRowBack}>
          <Text onPress={() => this.deleteFav(element.index)}>Favorite</Text>
          <Text title="Suppr." onPress={() => this.deleteFav(element.index)}>
            Supprimer
          </Text>
        </View>
        <View style={styles.standaloneRowFront}>
          <View
            style={{
              flexWrap: "wrap",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              {element.item.city} |
            </Text>
            <Text style={{ color: "white", fontSize: 20 }}>
              {element.item.temp}°C |
            </Text>
            <Text style={{ color: "white", fontSize: 20 }}>
              {element.item.main}
            </Text>
            <ImgWeather icon={element.item.iconImg} />
          </View>
        </View>
      </SwipeRow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "",
    width: "100%"
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "purple",
    justifyContent: "center",
    height: 50
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  backTextWhite: {
    color: "#FFF"
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  controls: {
    alignItems: "center",
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  }
});
