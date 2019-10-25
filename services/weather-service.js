import axios from "axios";
import { connect } from "react-redux";

const key = "db43ff03497223b4068cf6b52b7ed47a";
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}`;

class WeatherService {
  getWeatherHome(city) {
    return axios.get(`${url}&q=${city},fr&units=metric`);
  }
  getWeatherMe(lat,lon){
      return axios.get(`${url}&lat=${lat}&lon=${lon}&units=metric`)
  }
}

export default WeatherService;
