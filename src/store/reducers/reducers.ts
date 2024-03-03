import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import language from "./language";

export default combineReducers({
  auth,
  language,
});
