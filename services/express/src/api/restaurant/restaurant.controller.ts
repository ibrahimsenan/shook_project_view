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
import RestaurantService from './restaurant.services';

class RestaurantController {

    /**
     *  Post new Restaurant.
     * @memberof Restaurant
     * @Controller getUserById
     * @param request http request
     * @param response http response
     * @callback http response as an object 
     */

    static postRestaurant: RequestHandler = async (request, response) => {
        const newUserData = lodash.cloneDeep(request.body);
        newUserData.restaurant_id = ApiHelp.generateID();
        RestaurantService
            .storeRestaurant(newUserData)
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
                    ResponseMessages.alreadyExists,
                );
            });

    };



    /**
   *  Get all restaurants and it should be an array of object IRestaurant.
   * @memberof UsersController
   * @interface IRestaurant[] as object shape
   * @Controller getAllRestaurants
   * @param request http request
   * @param response http response
   * @callback http response as an object 
   */


    static getAllRestaurants: RequestHandler = async (
        request,
        response,
    ): Promise<any> => {
        const authResponse = REDIS_SERVICE.getTokenData(
            (request.headers as { access_token: string }).access_token,
        );
        if (authResponse) {
            RestaurantService
                .getAllRestaurant()
                .then((success) => {
                    ApiHelp.successfulResponse(
                        response,
                        success,
                        ResponseMessages.successfulFetchResponse
                    );
                })
                .catch((error) => {
                    ApiHelp.errorResponse(response, error, ResponseMessages.notFoundError);
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
    * Update Restaurant data
    * @memberof UsersController
    * @interface IRestaurant as object shape
    * @Controller getUserById
    * @param request http request
    * @param response http response
    * @callback http response as an object 
    */
    static getRestaurantById: RequestHandler = async (
        request,
        response,
    ): Promise<any> => {
        const authResponse = REDIS_SERVICE.getTokenData(
            (request.headers as { access_token: string }).access_token,
        );
        if (authResponse) {
            RestaurantService
                .getRestaurantById(parseInt(request.params.restaurant_id))
                .then((success) => {
                    ApiHelp.successfulResponse(
                        response,
                        success,
                        ResponseMessages.successfulFetchResponse
                    );
                })
                .catch((error) => {
                    ApiHelp.errorResponse(response, error, ResponseMessages.notFoundError);
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
    * Update restaurant data 
    * @memberof RestaurantController
    * @interface IRestaurant as object shape 
    * @Controller patchRestaurantById
    * @param request http request
    * @param response http response
    * @callback http response as an object 
    */
    static patchRestaurantById: RequestHandler = async (
        request,
        response): Promise<any> => {
        const authResponse = REDIS_SERVICE.getTokenData(
            (request.headers as { access_token: string }).access_token,
        );
        if (authResponse) {
            RestaurantService
                .patchOneRestaurant(parseInt(request.params.restaurant_id), request.body)
                .then((success) => {
                    ApiHelp.successfulResponse(
                        response,
                        success,
                        ResponseMessages.successfulFetchResponse
                    );
                })
                .catch((error) => {
                    ApiHelp.errorResponse(response, error, ResponseMessages.notFoundError);
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
     * Delete Restaurant Api
     * @memberof RestaurantController
     * @Controller deleteRestaurantById
     * @param request http request
     * @param response http response
     * @callback http response as an object success or boolean as true
     */
    static deleteRestaurantById: RequestHandler = async (
        request,
        response): Promise<any> => {
        const authResponse = REDIS_SERVICE.getTokenData(
            (request.headers as { access_token: string }).access_token,
        );
        if (authResponse) {
            RestaurantService
                .deleteOneRestaurant(parseInt(request.params.restaurant_id))
                .then((success) => {
                    ApiHelp.successfulResponse(
                        response,
                        success,
                        ResponseMessages.successfulFetchResponse
                    );
                })
                .catch((error) => {
                    ApiHelp.errorResponse(response, error, ResponseMessages.notFoundError);
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

export default RestaurantController