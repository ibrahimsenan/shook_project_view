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
import UsersService from './users.services';

class UsersController {
  /**
   *  Post new users.
   * @memberof UsersController
   * @Controller getUserById
   * @param request http request
   * @param response http response
   * @callback http response as an object
   */

  static postUsers: RequestHandler = async (request, response) => {
    const newUserData = lodash.cloneDeep(request.body);
    newUserData.user_id = ApiHelp.generateID();
    UsersService.storeUser(newUserData)
      .then((success) => {
        const successObj = ApiHelp.objectOmit(success, ['__v', '_id']);
        ApiHelp.successfulResponse(
          response,
          successObj,
          ResponseMessages.createdSuccessfully,
        );
      })
      .catch((error) => {
        ApiHelp.errorResponse(response, error, ResponseMessages.alreadyExists);
      });
  };

  /**
   *  Get all users and it should be an array of object IUser.
   * @memberof UsersController
   * @interface IUser[] as object shape
   * @Controller getUserById
   * @param request http request
   * @param response http response
   * @callback http response as an object
   */

  static getAllUsers: RequestHandler = async (
    request,
    response,
  ): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData(
      (request.headers as { access_token: string }).access_token,
    );
    if (authResponse) {
      UsersService.getAllUsers()
        .then((success) => {
          ApiHelp.successfulResponse(
            response,
            success,
            ResponseMessages.successfulFetchResponse,
          );
        })
        .catch((error) => {
          ApiHelp.errorResponse(
            response,
            error,
            ResponseMessages.notFoundError,
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
   * Update user data User Api
   * @memberof UsersController
   * @interface IUser as object shape
   * @Controller getUserById
   * @param request http request
   * @param response http response
   * @callback http response as an object
   */
  static getUserById: RequestHandler = async (
    request,
    response,
  ): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData(
      (request.headers as { access_token: string }).access_token,
    );
    if (authResponse) {
      UsersService.getUserById(parseInt(request.params.user_id))
        .then((success) => {
          ApiHelp.successfulResponse(
            response,
            success,
            ResponseMessages.successfulFetchResponse,
          );
        })
        .catch((error) => {
          ApiHelp.errorResponse(
            response,
            error,
            ResponseMessages.notFoundError,
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
   * Update user data User Api
   * @memberof UsersController
   * @interface IUser as object shape
   * @Controller patchUserById
   * @param request http request
   * @param response http response
   * @callback http response as an object
   */
  static patchUserById: RequestHandler = async (
    request,
    response,
  ): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData(
      (request.headers as { access_token: string }).access_token,
    );
    if (authResponse) {
      UsersService.patchOneUser(parseInt(request.params.user_id), request.body)
        .then((success) => {
          ApiHelp.successfulResponse(
            response,
            success,
            ResponseMessages.successfulFetchResponse,
          );
        })
        .catch((error) => {
          ApiHelp.errorResponse(
            response,
            error,
            ResponseMessages.notFoundError,
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
   * Delete User Api
   * @memberof UsersController
   * @Controller deleteUserById
   * @param request http request
   * @param response http response
   * @callback http response as an object success or boolean as true
   */
  static deleteUserById: RequestHandler = async (
    request,
    response,
  ): Promise<any> => {
    const authResponse = REDIS_SERVICE.getTokenData(
      (request.headers as { access_token: string }).access_token,
    );
    if (authResponse) {
      UsersService.deleteOneUser(parseInt(request.params.user_id))
        .then((success) => {
          ApiHelp.successfulResponse(
            response,
            success,
            ResponseMessages.successfulFetchResponse,
          );
        })
        .catch((error) => {
          ApiHelp.errorResponse(
            response,
            error,
            ResponseMessages.notFoundError,
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
}

export default UsersController;
