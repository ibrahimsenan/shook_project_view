
// import { REDUX_DISPATCH_PREFIX } from "../../../utils/redux";
const REDUX_DISPATCH_PREFIX = "RESTAURANT_APP_"
import { AnyAction } from 'redux';

export const SET_GET_USER_SIGN_IN_ASYNC = REDUX_DISPATCH_PREFIX + "SET_GET_USER_SIGN_IN_ASYNC";
export const SET_GET_USER_SIGN_IN_RESULT = REDUX_DISPATCH_PREFIX + "SET_GET_USER_SIGN_IN_RESULT";
export const RESET_SET_GET_USER_SIGN_IN_RESULT = REDUX_DISPATCH_PREFIX + "RESET_SET_GET_USER_SIGN_IN_RESULT";

export const SET_GET_VALIDATE_TOKEN_ASYNC = REDUX_DISPATCH_PREFIX + "SET_GET_VALIDATE_TOKEN_ASYNC";
export const SET_GET_VALIDATE_TOKEN_RESULT = REDUX_DISPATCH_PREFIX + "SET_GET_VALIDATE_TOKEN_RESULT";
export const RESET_SET_GET_VALIDATE_TOKEN_RESULT = REDUX_DISPATCH_PREFIX + "RESET_SET_GET_VALIDATE_TOKEN_RESULT";

export const SET_GET_EXTEND_TOKEN_ASYNC = REDUX_DISPATCH_PREFIX + "SET_GET_EXTEND_TOKEN_ASYNC";
export const SET_GET_EXTEND_TOKEN_RESULT = REDUX_DISPATCH_PREFIX + "SET_GET_EXTEND_TOKEN_RESULT";
export const RESET_SET_GET_EXTEND_TOKEN_RESULT = REDUX_DISPATCH_PREFIX + "RESET_SET_GET_EXTEND_TOKEN_RESULT";

export const DELETE_TOKEN_ASYNC = REDUX_DISPATCH_PREFIX + "DELETE_TOKEN_ASYNC";
export const DELETE_TOKEN_RESULT = REDUX_DISPATCH_PREFIX + "DELETE_TOKEN_RESULT";

export const SET_GET_USER_FORGET_PASSWORD_ASYNC = REDUX_DISPATCH_PREFIX + "SET_GET_USER_FORGET_PASSWORD_ASYNC";
export const GET_USER_FORGET_PASSWORD_RESULT = REDUX_DISPATCH_PREFIX + "GET_USER_FORGET_PASSWORD_RESULT";


interface initialStateType {
  getUserAccessTokenResult: any;
  setGetTokenResult: Record<string, any>;
  getUserForgetPassword: Record<string, any>;
}

export type ActionType =
  | { type: typeof SET_GET_USER_SIGN_IN_RESULT; getUserAccessTokenResults: any; }
  | { type: typeof DELETE_TOKEN_RESULT; getDeleteTokenResult: any }
  | { type: typeof GET_USER_FORGET_PASSWORD_RESULT; getUserForgetPasswordResult: any }
  | { type: typeof SET_GET_USER_SIGN_IN_ASYNC; userAccess: any }
  | { type: typeof SET_GET_VALIDATE_TOKEN_RESULT; getValidateTokenResult: any }
  | { type: typeof SET_GET_EXTEND_TOKEN_RESULT; getExtendTokenResult: any }
  | { type: typeof RESET_SET_GET_USER_SIGN_IN_RESULT }
  | { type: typeof RESET_SET_GET_EXTEND_TOKEN_RESULT }
  | { type: typeof SET_GET_VALIDATE_TOKEN_ASYNC }
  | { type: typeof RESET_SET_GET_USER_SIGN_IN_RESULT }
  | { type: typeof RESET_SET_GET_VALIDATE_TOKEN_RESULT };


const INITIAL_STATE: initialStateType = { getUserAccessTokenResult: {}, setGetTokenResult: {}, getUserForgetPassword: {} };



export function setGetUserSignInAsync(userAccess: any): ActionType {
  return {
    type: SET_GET_USER_SIGN_IN_ASYNC,
    userAccess
  };
}

export function setGetUserSignInResult(getUserAccessTokenResults: any) {
  return {
    type: SET_GET_USER_SIGN_IN_RESULT,
    getUserAccessTokenResults
  };
}


export function resetGetUserSignInResult(): ActionType {
  return {
    type: RESET_SET_GET_USER_SIGN_IN_RESULT
  };
}

export function setGetValidateTokenAsync(): ActionType {
  return {
    type: SET_GET_VALIDATE_TOKEN_ASYNC
  };
}


export function setGetValidateTokenResult(getValidateTokenResult: any): ActionType {
  return { type: SET_GET_VALIDATE_TOKEN_RESULT, getValidateTokenResult };
}

export function resetSetGetValidateTokenResult(): ActionType {
  return {
    type: RESET_SET_GET_VALIDATE_TOKEN_RESULT
  };
}

export function setGetExtendTokenAsync(): ActionType {
  return {
    type: SET_GET_EXTEND_TOKEN_ASYNC
  };
}


export function setGetExtendTokenResult(getExtendTokenResult: any): ActionType {
  return { type: SET_GET_EXTEND_TOKEN_RESULT, getExtendTokenResult };
}

export function resetSetGetExtendTokenResult(): ActionType {
  return {
    type: RESET_SET_GET_EXTEND_TOKEN_RESULT
  };
}


export function deleteTokenAsync(): ActionType {
  return {
    type: DELETE_TOKEN_ASYNC
  };
}


export function deleteTokenResult(getDeleteTokenResult: any): ActionType {
  return { type: DELETE_TOKEN_RESULT, getDeleteTokenResult };
}


export function setGetUserForgetPasswordAsync(): ActionType {
  return {
    type: SET_GET_USER_FORGET_PASSWORD_ASYNC
  };
}


export function setGetUserForgetPasswordResult(getUserForgetPasswordResult: any): ActionType {
  return { type: GET_USER_FORGET_PASSWORD_RESULT, getUserForgetPasswordResult };
}



export default function reducer(state = INITIAL_STATE, action: AnyAction): initialStateType {
  switch (action.type) {

    case SET_GET_USER_SIGN_IN_RESULT:
      console.log("action.getUserAccessTokenResult", action.type)
      return {
        ...state,
        getUserAccessTokenResult: action.getUserAccessTokenResults,
      };
    case SET_GET_VALIDATE_TOKEN_RESULT:
      return {
        ...state,
        setGetTokenResult: action.getValidateTokenResult
      };
    case SET_GET_EXTEND_TOKEN_RESULT:
      return {
        ...state,
        setGetTokenResult: action.getExtendTokenResult
      };
    case DELETE_TOKEN_RESULT:
      return {
        ...state,
        setGetTokenResult: action.getDeleteTokenResult
      };
    case GET_USER_FORGET_PASSWORD_RESULT:
      return {
        ...state,
        getUserForgetPassword: action.getUserForgetPasswordResult
      };
    case RESET_SET_GET_USER_SIGN_IN_RESULT:
      return {
        ...state,
        getUserAccessTokenResult: INITIAL_STATE.getUserAccessTokenResult
      };

    case RESET_SET_GET_VALIDATE_TOKEN_RESULT:
      return {
        ...state,
        setGetTokenResult: INITIAL_STATE.setGetTokenResult
      };
    case RESET_SET_GET_EXTEND_TOKEN_RESULT:
      return {
        ...state,
        setGetTokenResult: INITIAL_STATE.setGetTokenResult
      };
    default:
      return state;
  }
}
