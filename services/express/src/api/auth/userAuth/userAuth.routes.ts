/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains route handlers that map HTTP requests to the corresponding controllers 
 * 
*/

const REMOVE_TOKEN = '/auth/remove_token';
const FORGET_PASSWORD = '/forget-password/:email_address';

import { Router } from 'express';
import UserAuthController from './userAuth.controller';
const userAuth = Router();


const USER_LOGIN = '/auth/user-login';
const EXTEND_TOKEN_TIME = '/auth/extend-token';
const VALIDATE_USER_TOKEN = '/auth/validate_token';
const USER_CHANGE_PASSWORD = '/auth/change-password';

/**
 * Express post connected to Controller
 */
userAuth.post(USER_LOGIN, UserAuthController.postGetUserLogin);
/**
 * Express get all documents
 */
userAuth.get(VALIDATE_USER_TOKEN, UserAuthController.getValidateUserToken);
/**
 * Express get a document per service id
 */
userAuth.get(EXTEND_TOKEN_TIME, UserAuthController.getExtendTokenTTL)
/**
 * Express patch one or more keys in a document per service id
 */
userAuth.patch(USER_CHANGE_PASSWORD, UserAuthController.patchChangeUserPassword)
/**
 * Express get a document per service id
 */
userAuth.get(REMOVE_TOKEN, UserAuthController.getRemoveUserToken)
/**
 * Express get a document per service id
 */
userAuth.get(FORGET_PASSWORD, UserAuthController.getForgetUserPassword)



// we need to convert to es export module 
// export default userAuth
module.exports = userAuth;
