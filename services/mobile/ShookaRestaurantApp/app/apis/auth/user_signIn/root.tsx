
import API_UTILS from "../../../utils/api";

/**
 * @function
 * @module api/auth/root
 * @returns {Response|Error}
 */

export function* userSignIn(userAccess: any) {
  const api = "/api/v1/auth/user-login";
  const fetchResponse = API_UTILS.fetch(api, "POST", userAccess);
  return API_UTILS.executeFetchAsPromise(fetchResponse);
}

export function* getValidateUserToken() {
  const api = "/api/v1/auth/validate_token";
  const fetchResponse = API_UTILS.fetch(api, "GET");
  return API_UTILS.executeFetchAsPromise(fetchResponse);
}


export function* getExtendUserToken() {
  const api = "/api/v1/auth/extend-token";
  const fetchResponse = API_UTILS.fetch(api, "GET");
  return API_UTILS.executeFetchAsPromise(fetchResponse);
}

export function* getDeleteUserToken() {
  const api = "/api/v1/auth/remove_token";
  const fetchResponse = API_UTILS.fetch(api, "GET");
  return API_UTILS.executeFetchAsPromise(fetchResponse);
}


export function* getAllUsersColors() {
  const api = "https://catfact.ninja/fact";
  const fetchResponse = API_UTILS.fetch(api, "GET");
  return API_UTILS.executeFetchAsPromise(fetchResponse);
}

export function* getUserColor(username: string) {
  const api = `api/users/users_colors/${username}`;
  const fetchResponse = API_UTILS.fetch(api, "GET");
  //return API.executeFetchAsPromise(fetchResponse);
  return fetchResponse;
}

export function* getUserForgetPassword(userEmail: string) {
  const api = "/api/v1/auth/forget-password/" + userEmail;
  const fetchResponse = API_UTILS.fetch(api, "GET");
  return API_UTILS.executeFetchAsPromise(fetchResponse);
}
