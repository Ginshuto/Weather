import React from "react";
import HomePage from "../pages/HomePage";
import SettingsPage from "../pages/SettingsPage";
import FavoritesPage from "../pages/FavoritesPage";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import AddFavoritesPage from "../pages/AddFavoritesPage";

const favoritesNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesPage
    },
    AddFavorites: {
      screen: AddFavoritesPage
    }
  },
  {
    initialRouteName: "Favorites",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "blue"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        tabBarLabel: "Accueil",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} size={25} name={"ios-home"} />
        )
      }
    },
    Settings: {
      screen: SettingsPage,
      navigationOptions: {
        tabBarLabel: "Paramètres",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} size={25} name={"ios-settings"} />
        )
      }
    },
    Favorites: {
      screen: favoritesNavigator,
      navigationOptions: {
        tabBarLabel: "Favoris",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} size={25} name={"ios-star"} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    activeColor: "yellow",
    inactiveColor: "white",
    barStyle: { backgroundColor: "blue" },
    labelStyle: { textAlign: "center" }
  }
);

export default tabNavigator;
