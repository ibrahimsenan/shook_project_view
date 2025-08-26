/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains controller classes responsible for handling specific
 * endpoints and return the data base responses.
 * 
*/

import { RequestHandler } from 'express';
import lodash from 'lodash';
import { ResponseMessages } from 'src/shared/ResponseMessages';
import REDIS_SERVICE from '../auth/redisService';
import ApiHelp from '../utils/apiHandlers';
import userContactsService from './userContacts.services';




/** test documentation!
 * @class UserContactController
 * @returns a list of functions
 */

class UserContactController {

  /** test documentation!
 * @memberof UserContactController
 * @param RequestHandler as express request response handlers
 * @callback async response
 */
  static postUserContacts: RequestHandler = async (request, response) => {
    const authResponse = await REDIS_SERVICE.getTokenData(
      (request.headers as { access_token: string }).access_token,
    );
    if (authResponse !== undefined) {
      const newContact = lodash.cloneDeep(request.body);
      newContact.contact_id = ApiHelp.generateID();
      userContactsService
        .storeUserContact(newContact)
        .then((success) => {
          const successObj = ApiHelp.objectOmit(success, ['__v', '_id']);
          ApiHelp.successfulResponse(
            response,
            successObj,
            ResponseMessages.createdSuccessfully,
          );
        })
        .catch((error) => {
          ApiHelp.errorResponse(
            response,
            error,
            ResponseMessages.forbiddenAction,
          );
        });
    } else {
      ApiHelp.errorResponse(
        response,
        {},
        ResponseMessages.tokenExpiredOrInvalid,
      );
    }
  };

  /**
   * Get all users contacts and it should be an array.
   * @param request express request handler 
   * @param response express response handler 
   * @callback http response as an array 
   */
  static getUserContacts: RequestHandler = async (
    request,
    response,
  ): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData(
      (request.headers as { access_token: string }).access_token,
    );
    if (authResponse) {
      // const allContactDetail = await CONTACT_DETAIL.find();
      userContactsService
        .getContactsDetails()
        .then((success) => {
          ApiHelp.successfulResponse(
            response,
            success,
            'Data fetched Completed',
          );
        })
        .catch((error) => {
          ApiHelp.errorResponse(response, error, `No Record Found`);
        });
    } else {
      ApiHelp.errorResponse(
        response,
        {},
        ResponseMessages.tokenExpiredOrInvalid,
      );
    }
  };

  /**
   * Get user contacts using user_id 
   * @param request 
   * @param response 
   * @callback http response 
   */
  static getUserContactsPerUserId: RequestHandler = async (request, response): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData((request.headers as { access_token: string }).access_token)
    if (authResponse) {

      userContactsService.getContactDetailsByUserID(parseInt(request.params.user_id))
        .then(success => {
          ApiHelp.successfulResponse(
            response,
            success,
            ResponseMessages.successfulResponse,
          );
        }).catch(error => {
          ApiHelp.errorResponse(response, error, ResponseMessages.entityNotFound);
        })
    } else {
      ApiHelp.errorResponse(response, {}, ResponseMessages.tokenExpiredOrInvalid)
    }
  }

  /**
   * Get user contacts using user_id 
   * @param request 
   * @param response 
   * @callback http response 
   */
  static getUserContactsPerId: RequestHandler = async (request, response): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData((request.headers as { access_token: string }).access_token)
    if (authResponse) {
      userContactsService.getOneContact(parseInt(request.params.contact_id))
        .then(success => {
          ApiHelp.successfulResponse(response, success, ResponseMessages.successfulResponse)
        }).catch(error => {
          ApiHelp.errorResponse(response, error, ResponseMessages.entityNotFound)
        })
    } else {
      ApiHelp.errorResponse(response, {}, ResponseMessages.tokenExpiredOrInvalid)
    }
  }

  /**
 * Update user contacts only some values not all object need to be updated
 * @param request 
 * @param response 
 * @callback http response 
 */
  static patchUserContacts: RequestHandler = async (request, response): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData((request.headers as { access_token: string }).access_token)
    if (authResponse) {
      userContactsService.patchOneContact(parseInt(request.params.contact_id), request.body)
        .then(success => {
          ApiHelp.successfulResponse(response, success, ResponseMessages.successfulResponse)
        })
        .catch(error => {
          ApiHelp.errorResponse(response, error, ResponseMessages.entityNotFound)
        })
    } else {
      return ApiHelp.errorResponse(response, {}, ResponseMessages.tokenExpiredOrInvalid)
    }

  }

  /**
 * Delete user contacts 
 * @param request 
 * @param response 
 * @callback http response 
 */
  static deleteUserContacts: RequestHandler = async (request, response): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData((request.headers as { access_token: string }).access_token)

    if (authResponse) {
      userContactsService.deleteOneContact(parseInt(request.params.contact_id)).then(
        success => {
          ApiHelp.successfulResponse(response, success, ResponseMessages.successfulResponse)
        }
      ).catch(error => {
        ApiHelp.errorResponse(response, error, ResponseMessages.entityNotFound)
      })
    } else {
      return ApiHelp.errorResponse(response, {}, ResponseMessages.tokenExpiredOrInvalid)
    }
  }
}

export default UserContactController;