/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains route handlers that map HTTP requests to the corresponding controllers 
 * 
*/



import { Router } from 'express';
import UsersController from './users.controller';
const userRouters = Router();

const USER_ROUTE = '/user';
const USER_ROUTE_ID = '/user/:user_id';

/**
 * Express post connected to Controller
 */
userRouters.post(USER_ROUTE, UsersController.postUsers);
/**
 * Express get all documents
 */
userRouters.get(USER_ROUTE, UsersController.getAllUsers);
/**
 * Express get a document per service id
 */
userRouters.get(USER_ROUTE_ID, UsersController.getUserById)
/**
 * Express patch one or more keys in a document per service id
 */
userRouters.patch(USER_ROUTE_ID, UsersController.patchUserById)
/**
 * Express delete a document per service id
 */
userRouters.delete(USER_ROUTE_ID, UsersController.deleteUserById)



// we need to convert to es export module 
// export default userRouters
module.exports = userRouters;
