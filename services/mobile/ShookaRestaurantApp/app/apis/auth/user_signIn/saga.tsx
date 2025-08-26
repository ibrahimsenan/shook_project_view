import { AnyAction } from 'redux';
import { put, takeEvery } from "redux-saga/effects";

import {
  DELETE_TOKEN_ASYNC, SET_GET_EXTEND_TOKEN_ASYNC,
  SET_GET_USER_FORGET_PASSWORD_ASYNC, SET_GET_USER_SIGN_IN_ASYNC,
  SET_GET_VALIDATE_TOKEN_ASYNC, deleteTokenResult,
  setGetExtendTokenResult, setGetUserForgetPasswordResult,
  setGetUserSignInResult, setGetValidateTokenResult
} from "./reducer";
import {
  getDeleteUserToken, getExtendUserToken,
  getUserForgetPassword, getValidateUserToken, userSignIn
} from "./root";


function* setGetUserSignInSaga(action: AnyAction) {
  const GEN = userSignIn(action.userAccess);
  const GET_USER_ACCESS_TOKEN: ReturnType<typeof GEN.next>["value"] = yield GEN.next().value;
  yield put(setGetUserSignInResult(GET_USER_ACCESS_TOKEN));
}

function* validateTokenSaga() {
  const GEN = getValidateUserToken();
  const GET_VALIDATE_USER_TOKEN: ReturnType<typeof GEN.next>["value"] = yield GEN.next().value;
  yield put(setGetValidateTokenResult(GET_VALIDATE_USER_TOKEN));
}

function* extendUserTokenSaga() {
  const GEN = getExtendUserToken();
  const GET_EXTEND_USER_TOKEN: ReturnType<typeof GEN.next>["value"] = yield GEN.next().value;
  yield put(setGetExtendTokenResult(GET_EXTEND_USER_TOKEN));
}

function* deleteUserTokenSaga() {
  const GEN = getDeleteUserToken();
  const GET_DELETE_USER_TOKEN: ReturnType<typeof GEN.next>["value"] = yield GEN.next().value;
  yield put(deleteTokenResult(GET_DELETE_USER_TOKEN));
}

function* getUserForgetPasswordSaga(action: AnyAction) {
  const GEN = getUserForgetPassword(action.userEmail);
  const GET_DELETE_USER_TOKEN: ReturnType<typeof GEN.next>["value"] = yield GEN.next().value;
  yield put(setGetUserForgetPasswordResult(GET_DELETE_USER_TOKEN));
}

export default function* watchUserColorSaga() {
  yield takeEvery(SET_GET_USER_SIGN_IN_ASYNC, setGetUserSignInSaga);
  yield takeEvery(SET_GET_VALIDATE_TOKEN_ASYNC, validateTokenSaga);
  yield takeEvery(SET_GET_EXTEND_TOKEN_ASYNC, extendUserTokenSaga);
  yield takeEvery(DELETE_TOKEN_ASYNC, deleteUserTokenSaga);
  yield takeEvery(SET_GET_USER_FORGET_PASSWORD_ASYNC, getUserForgetPasswordSaga);

}

