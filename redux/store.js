import {createStore} from "redux";
import ServicesReducer from "./reducers/ServicesReducer";

export const store = createStore(ServicesReducer);