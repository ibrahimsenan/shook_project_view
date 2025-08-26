
import { all } from "redux-saga/effects";
import ApiAuthSaga from "../apis/auth/user_signIn/saga";

export default function* rootSaga() {
  yield all(
    [
      ApiAuthSaga()
    ]
  );

}

