import { combineReducers, createStore } from "redux";
import { productDetailsReducer } from "./reducers/productDetailsReducer";
import { eachProductDetailsReducer } from "./reducers/eachProductDetailsReducer";

const productReducer = combineReducers({
  prodDetails: productDetailsReducer,
  // eachprodDetails: eachProductDetailsReducer,
});

const store = createStore(productReducer);
export default store;
