import { combineReducers } from "redux";
import month from "./month";
import expense from "./expense";
import edit from "./edit";

const rootReducer = combineReducers({
  month,
  expense,
  edit,
});

export default rootReducer;
