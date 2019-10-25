import { createStore } from "redux";
import { mainReducer } from "../reducers/reducers";

export default createStore(mainReducer);
