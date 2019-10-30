import WeatherService from "../../services/weather-service"
const INITIAL_STATE = {
    weatherService: new WeatherService()
}
export default (state = INITIAL_STATE, action) => {
    return state;
}