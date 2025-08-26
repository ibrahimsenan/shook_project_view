/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains route handlers that map HTTP requests to the corresponding controllers 
 * 
*/

import { Router } from 'express';
import UserContactController from './userContacts.controller';
const userContactsRouters = Router();

const CONTACT_ROUTE = '/users/contacts';
const CONTACT_ROUTE_USER_ID = '/users/contacts/user_id={:user_id}';
const CONTACT_ROUTE_ID = '/users/contacts/:contact_id';


/**
 * Express post connected to Controller
 */
userContactsRouters.post(CONTACT_ROUTE, UserContactController.postUserContacts);
/**
 * Express get all documents
 */
userContactsRouters.get(CONTACT_ROUTE, UserContactController.getUserContacts);
/**
 * Express get a document per user id
 */
userContactsRouters.get(CONTACT_ROUTE_USER_ID, UserContactController.getUserContactsPerUserId)
/**
 * Express get a document per service id
 */
userContactsRouters.get(CONTACT_ROUTE_ID, UserContactController.getUserContactsPerId)
/**
 * Express patch one or more keys in a document per service id
 */
userContactsRouters.patch(CONTACT_ROUTE_ID, UserContactController.patchUserContacts)
/**
 * Express delete a document per service id
 */
userContactsRouters.delete(CONTACT_ROUTE_ID, UserContactController.deleteUserContacts)



// we need to convert to es export module 
// export default userContactsRouters

module.exports = userContactsRouters;

// commnet