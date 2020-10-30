import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import location from "./location";

const reducer = combineReducers({
  location,
});
const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
