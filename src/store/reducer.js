import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { countSlice } from "./countSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  count: countSlice.reducer,
});
