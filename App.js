import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import mainReducer from "./reducers/reducers";

const store = createStore(mainReducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#124789",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: ""
  }
});
