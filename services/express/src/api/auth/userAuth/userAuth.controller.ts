/* Created and developed by Ibrahim senan (ibrahimsenan). 
 *
 * What this is about: 
 * Contains controller classes responsible for handling specific
 * endpoints and return the data base responses.
 * 
*/



import { RequestHandler } from 'express';
import { ResponseMessages } from 'src/shared/ResponseMessages';
import UsersService from '../../users/users.services';
import ApiHelp from '../../utils/apiHandlers';
import REDIS_SERVICE from '../redisService';
const express = require('express');
const router = express.Router();

// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');

import bcrypt from "bcrypt";
import hat from "hat";
import { IUser } from "services/express/src/api/users/users.model";

// user can login

class UserAuthController {

    /**
     *  Post Get User Login Details.
     * @memberof Auth
     * @Controller Validate user access
     * @param request http request
     * @param response http response
     * @callback http response as an object 
     */

    static postGetUserLogin: RequestHandler = async (request, response) => {
        // const callBack = await Validator.validateUser(request.body);

        // if (true)
        //     return ApiHelp.errorResponse(response, false, error.details[0].message);
        UsersService.getUserByNameOrEmail((request.body as
            { userName: string }).userName)
            .then(async (success) => {
                const userData = ApiHelp.objectOmit(success, ['__v', '_id']) as IUser;

                const validatePassword = await bcrypt.compare(
                    request.body.password,
                    userData.password,
                );
                if (!validatePassword) {
                    ApiHelp.errorResponse(
                        response,
                        {},
                        ResponseMessages.incorrectCredentials,
                    );
                }

                // jwt Token service
                //const token = utils.generateAuthToken(user);

                // Shooka Access Token service
                const token = hat();
                const authData = {
                    email_address: userData.email_address,
                    user_id: userData.user_id,
                    is_admin: userData.is_admin,
                    // is_restaurant_admin: userData.is_restaurant_admin,
                    is_system_admin: userData.is_system_admin,
                    allowed_modules: [],
                    user_rules: [],
                };

                const redisSer = REDIS_SERVICE.saveTokenData(token, authData);
                redisSer &&
                    userData && ApiHelp.successfulResponse(
                        response,
                        { access_token: token },
                        ResponseMessages.successfulResponse,
                    );
            })
            .catch((error) => {
                ApiHelp.errorResponse(
                    response,
                    error,
                    ResponseMessages.incorrectCredentials,
                );
            });


    };



    /**
     *  Get token details.
     * @memberof UserAuthController
     * @Controller getValidateUserToken
     * @param request http request
     * @param response http response
     * @callback http response as an object 
     */


    static getValidateUserToken: RequestHandler = async (
        request,
        response,
    ): Promise<any> => {
        const authResponse = REDIS_SERVICE.isTokenExists(
            (request.headers as { access_token: string }).access_token);
        if (authResponse) {
            ApiHelp.successfulResponse(
                response,
                { is_valid_token: true },
                ResponseMessages.successfulResponse,
            );

        } else {
            ApiHelp.errorResponse(
                response,
                { is_valid_token: false },
                ResponseMessages.tokenExpiredOrInvalid,
            );
        }
    };


    /**
     *  Get extend token live time.
     * @memberof UserAuthController
     * @Controller getExtendTokenTTL
     * @param request http request
     * @param response http response
     * @callback http response as an object 
     */
    static getExtendTokenTTL: RequestHandler = async (
        request,
        response,
    ): Promise<any> => {
        const authResponse = REDIS_SERVICE.keepAliveToken(
            (request.headers as { access_token: string }).access_token);
        if (authResponse) {
            ApiHelp.successfulResponse(
                response,
                authResponse,
                ResponseMessages.successfulResponse,
            );

        } else {
            ApiHelp.errorResponse(
                response,
                authResponse,
                ResponseMessages.tokenExpiredOrInvalid,
            );
        }
    };


    /**
     *  Patch change user password.
     * @memberof UserAuthController
     * @Controller patchChangeUserPassword
     * @param request http request
     * @param response http response
     * @callback http response as an object 
     */
    static patchChangeUserPassword: RequestHandler = async (
        request,
        response): Promise<any> => {
        const authResponse = REDIS_SERVICE.getTokenData(
            (request.headers as { access_token: string }).access_token,
        );
        if (authResponse) {
            UsersService.getUserByNameOrEmail(null, request.body.email_address)
                .then(async (success) => {
                    const userData = ApiHelp.objectOmit(success, ['__v', '_id', 'password']) as IUser;

                    const validatePassword = await bcrypt.compare(
                        request.body.old_password,
                        userData.password,
                    );

                    if (!validatePassword) {
                        ApiHelp.errorResponse(
                            response,
                            false,
                            ResponseMessages.passwordMismatch
                        );
                    }
                    // thi need to be FE
                    //   const comparNewPass = isEqual(
                    //     request.body.new_password,
                    //     request.body.repeated_new_password,
                    //   );
                    // if (!comparNewPass)
                    // return utils.errorResponse(response, false, 'New passwords not matched');
                    //encrypt new password
                    userData.password = await bcrypt.hash(request.body.new_password, 10);
                    validatePassword &&
                        userData &&
                        UsersService.patchOneUser(userData.user_id, userData)
                            .then((updated) => {
                                ApiHelp.successfulResponse(
                                    response,
                                    updated.email_address,
                                    ResponseMessages.passwordChangedSuccessfully
                                );
                            }).catch((error) => {
                                ApiHelp.errorResponse(
                                    response,
                                    error,
                                    ResponseMessages.incorrectCredentials,
                                );
                            });
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
     *  Get remove user token.
     * @memberof UserAuthController
     * @Controller getRemoveUserToken
     * @param request http request
     * @param response http response
     * @callback http response as an object 
     */
    static getRemoveUserToken: RequestHandler = async (
        request,
        response): Promise<any> => {
        const authResponse = REDIS_SERVICE.removeToken(
            (request.headers as { access_token: string }).access_token);
        if (authResponse) {
            ApiHelp.successfulResponse(
                response,
                authResponse,
                ResponseMessages.successfulResponse,
            );

        } else {
            ApiHelp.errorResponse(
                response,
                authResponse,
                ResponseMessages.tokenExpiredOrInvalid,
            );
        }
    };

    /**
 *  Get forget user password.
 * @memberof UserAuthController
 * @Controller getForgetUserPassword
 * @param request http request
 * @param response http response
 * @callback http response as an object 
 */
    static getForgetUserPassword: RequestHandler = async (
        request,
        response): Promise<any> => {
        // const user = await User.findOne({
        //     email_address: request.params.email_address,
        //   });
        //   if (!user)
        //     utils.errorResponse(
        //       response,
        //       request.params.email_address,
        //       `user  ${request.params.email_address} is not found`,
        //     );

        //   let testAccount = await nodemailer.createTestAccount();
        //   let transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //       user: testAccount.user, // generated ethereal user
        //       pass: testAccount.pass, // generated ethereal password
        //     },
        //   });

        //   // send mail with defined transport object
        //   let info = await transporter.sendMail({
        //     from: 'ibrahim.senan@yahoo.com', // sender address
        //     to: 'tomzain123@yahoo.com', // list of receivers
        //     subject: 'Hello ✔', // Subject line
        //     text: 'Hello world?', // plain text body
        //     html: '<b>Hello world?</b>', // html body
        //   });

        //   console.log('Message sent: %s', info.messageId);
        //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //   // Preview only available when sending through an Ethereal account
        //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        //   utils.successfulResponse(response, info, `user ${user.userName} is patched`);

    };

}


export default UserAuthController