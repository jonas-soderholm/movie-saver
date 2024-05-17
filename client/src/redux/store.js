import { createStore } from "redux";
import rootReducer from "./reducers"; // Assume you have created your reducers

const store = createStore(rootReducer);

export default store;
