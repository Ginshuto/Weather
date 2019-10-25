import axios from "axios";

export function getWeatherHome(city) {
  return dispatch => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=db43ff03497223b4068cf6b52b7ed47a&q=${city},fr&units=metric`
      )
      .then(resp => {
        dispatch(WeatherHome(resp.data));
      });
    //     this.setState({
    //         wea: resp.data
    //     });
    // })).catch(err => {
    //     alert(err);
    // });
  };
}
export function WeatherHome(data) {
  return {
    type: "WEATHER_HOME",
    wea: data
  };
}
export function getWeatherMe(lat, lon) {
  return dispatch => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=db43ff03497223b4068cf6b52b7ed47a&lat=${lat}&lon=${lon}&units=metric`
      )
      .then(resp => {
        dispatch(WeatherMe(resp.data));
      });
    //     this.setState({
    //         wea: resp.data
    //     });
    // })).catch(err => {
    //     alert(err);
    // });
  };
}
export function WeatherMe(data) {
  return {
    type: "WEATHER_ME",
    me: data
  };
}
