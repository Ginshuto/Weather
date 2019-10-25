import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  RefreshControl
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationEvents } from "react-navigation";
import { SwipeRow } from "react-native-swipe-list-view";
// import ItemWeather from "../components/ItemWeather";

export default class FavoritesPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Favoris",
      headerRight: (
        <Icon
          color={"white"}
          size={35}
          name={"ios-add"}
          style={{ paddingRight: 25 }}
          onPress={() =>
            AsyncStorage.getItem("cities").then(data => {
              let tab = [];
              if (data != null) {
                tab = JSON.parse(data);
              }
              if (tab.length < 15) {
                navigation.push("AddFavorites");
              } else {
                alert("Veuillez supprimer une ville, 15 maximum");
              }
            })
          }
        />
      )
    };
  };

  state = { cities: [], modalVisible: false, refreshing: false };

  onAddPress() {
    console.log(this.props);
    this.props.navigation.navigate("AddFavorites", {
      onGoBack: () => this.refresh()
    });
  }

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
  newFav(city){
    AsyncStorage.setItem("FavCity",city);
    this.props.navigation.navigate("Home", {
      onGoBack: () => this.refresh()
    })
  }
  componentDidMount() {
    // this.refresh();
  }

  refresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem("cities").then(data => {
      this.setState({ cities: JSON.parse(data), refreshing: false });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.refresh()} />
        <FlatList
          data={this.state.cities}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={element => (
            // <ItemWeather key={element.item} city={element.item} />)}/>
        
        
        <SwipeRow leftOpenValue={100} rightOpenValue={-100}>
          <View style={styles.standaloneRowBack}>
            <Text onPress={() => this.newFav(element.item.city)}>Ville Favorite</Text>
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
        )}/>
      </View>
    );
  }
}

export const ImgWeather = props => {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={{ uri: `http://openweathermap.org/img/wn/${props.icon}@2x.png` }}
    />
  );
};
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
