import { combineReducers } from "redux";
import ApisUserAuthReducer from "../apis/auth/user_signIn/reducer";
export default combineReducers({
  ApisUserAuth: ApisUserAuthReducer
});
