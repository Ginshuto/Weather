const defaultState = {
  wea: null,
  me: null
};
export default function mainReducer (state = defaultState, action)  {
  let nextState;
  switch (action.type) {
    case "WEATHER_HOME":
      nextState = {
        ...state,
        wea: action.wea
      };
      return nextState;
    case "WEATHER_ME":
      nextState = {
        ...state,
        me: action.me
      };
      return nextState;
    default:
      return state;
  }
};
