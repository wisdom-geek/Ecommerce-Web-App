import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import productsReducer from "../reducers/productsReducers";
import categoriesReducer from "../reducers/categoriesReducers";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
