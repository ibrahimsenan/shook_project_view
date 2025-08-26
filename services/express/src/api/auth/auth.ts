const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const USER_LOGIN = '/auth/user-login';
const USER_CHANGE_PASSWORD = '/auth/change-password';
const VALIDATE_USER_TOKEN = '/auth/validate_token';
const EXTEND_TOKEN_TIME = '/auth/extend-token';
const REMOVE_TOKEN = '/auth/remove_token';
const FORGET_PASSWORD = '/forget-password/:email_address';
const lodash = require('lodash');
const User = require('@modules/Users/User');
const Validator = require('@utils/validation');
const ApiHelper = require('@utils/apiHelpers');
const EXCLUDED_KEYS = require('@utils/excluded_keys');
const AUTH_HANDLER = require('@auth/auth_handlers');
const TokenService = require('./auth_service/tokenService');

import redisService from "./redisService";
// const redisService = require('./redisService');
const hat = require('hat');

const utils = new ApiHelper();
const validate = new Validator();
// user can login

router.post(USER_LOGIN, async (request, response) => {
  const { error } = await validate.validateUser(request.body);
  if (error)
    return utils.errorResponse(response, false, error.details[0].message);

  const userData = await User.findOne({
    userName: request.body.userName,
  });
  if (!userData)
    return utils.errorResponse(
      response,
      request.body.userName,
      `user  ${request.body.userName} is not found`,
    );

  const validatePassword = await bcrypt.compare(
    request.body.password,
    userData.password,
  );
  if (!validatePassword)
    return utils.errorResponse(
      response,
      false,
      'Invalid Email Address or Password',
    );

  // jwt Token service
  //const token = utils.generateAuthToken(user);

  // Dino Access Token service
  const token = hat();
  const authData = {
    email_address: userData.email_address,
    user_id: userData.user_id,
    is_admin: userData.is_admin,
    is_restaurant_admin: userData.is_restaurant_admin,
    is_system_admin: userData.is_system_admin,
    allowed_modules: [],
    user_rules: [],
  };
  const redisSer = redisService.saveTokenData(token, authData);
  ///const saveToken = TokenService.saveTokenData(token, userData);
  //const validateToken = redisService.getTokenData(token, response);
  const userString = JSON.stringify(userData);
  const UserData = lodash.omit(JSON.parse(userString), [
    'password',
    '__v',
    '_id',
  ]);

  redisSer &&
    userData &&
    utils.successfulResponse(
      response,
      { access_token: token },
      null
    );
});

// validate token
router.get(VALIDATE_USER_TOKEN, async (request, response) => {
  const authToken = redisService.isTokenExists(
    (request.headers as { access_token: string }).access_token);

  authToken && utils.successfulResponse(response, true, 'Token Alive');
});

//extend token time

router.get(EXTEND_TOKEN_TIME, async (request, response) => {
  const authToken = redisService.keepAliveToken(
    (request.headers as { access_token: string }).access_token);

  authToken && utils.successfulResponse(response, authToken, 'Token Alive');
});

router.get(REMOVE_TOKEN, async (request, response) => {
  const authToken = redisService.removeToken(
    (request.headers as { access_token: string }).access_token);

  authToken && utils.successfulResponse(response, authToken, 'Token Removed');
});

// User Change password

router.patch(USER_CHANGE_PASSWORD, async (request, response) => {
  //validate access_token
  const authToken = redisService.getTokenData(
    (request.headers as { access_token: string }).access_token);

  //validate user data
  const userData = await User.findOne({
    email_address: request.body.email_address,
  });
  const user = lodash.cloneDeep(userData);
  if (!user)
    utils.errorResponse(
      response,
      request.body.userName,
      `user  ${request.body.email_address} is not found`,
    );

  //validate user passwords
  const validatePassword = await bcrypt.compare(
    request.body.old_password,
    user.password,
  );
  if (!validatePassword)
    return utils.errorResponse(
      response,
      false,
      'Invalid Email Address or Password',
    );

  //validate user new passwords
  const comparNewPass = lodash.isEqual(
    request.body.new_password,
    request.body.repeated_new_password,
  );
  if (!comparNewPass)
    return utils.errorResponse(response, false, 'New passwords not matched');
  //encrypt new password
  user.password = await bcrypt.hash(request.body.new_password, 10);

  comparNewPass &&
    validatePassword &&
    user &&
    User.updateOne(
      { email_address: request.body.email_address },
      user,
      (error, res) => {
        if (error) {
          return utils.errorResponse(
            response,
            error,
            `user  ${request.body.userName} is not found`,
          );
        }
        return utils.successfulResponse(
          response,
          request.body.email_address,
          `user ${user.userName} is patched`,
        );
      },
    );
});

// USER FORGET_PASSWORD
router.get(FORGET_PASSWORD, async (request, response) => {
  const user = await User.findOne({
    email_address: request.params.email_address,
  });
  if (!user)
    utils.errorResponse(
      response,
      request.params.email_address,
      `user  ${request.params.email_address} is not found`,
    );

  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'ibrahim.senan@yahoo.com', // sender address
    to: 'tomzain123@yahoo.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  utils.successfulResponse(response, info, `user ${user.userName} is patched`);
});

module.exports = router;
