//const config = require("config");
import jwt from 'jsonwebtoken';
import lodash, { isArray } from 'lodash';
import { IResponse } from 'services/express/src/shared/interfaces';
type Users = {
  email_address: string;
  userName: string;
  user_id: number;
};

class ApiHelper {
  static response = null;
  static errorObject(error: object, message: string): IResponse {
    const ERROR_OBJ: IResponse = {
      statusMessage: 'ERROR',
      status: 403,
      message: message,
      reason: error,
      response: undefined,
      total: 1
    };

    return ERROR_OBJ;
  }

  static generateID(): number {
    return Math.floor(Math.random() * 10000000000);
  }

  static successObject(data: object, message: string): object {
    const SUCCESS_OBJ = {
      statusMessage: 'SUCCESS',
      status: 200,
      message: message,
      response: data,
    };

    return SUCCESS_OBJ;
  }

  static generateAuthToken(user: Users): string {
    const token = jwt.sign(
      {
        emailAddress: user.email_address,
        user_name: user.userName,
        userId: user.user_id,
      },
      'dineIn_jwtPrivateKey', // config.get("jwtPrivateKey")
      { expiresIn: '5h' },
    );
    return token;
  }

  static verifyAuthToken(token: string): any {
    let responseToken = null;
    jwt.verify(
      token,
      'dineIn_jwtPrivateKey',
      { expiresIn: '5h' },
      (error, verified) => {
        if (error) {
          responseToken = error;
        } else {
          responseToken = verified;
        }
      },
    );
    return responseToken;
  }

  static objectOmit(responseObj: any, keys: string[]): object {
    const formattedObject = lodash.omit(responseObj, keys);
    return formattedObject;
  }

  static errorResponse(
    response: any,
    data: any,
    message: string,
  ): IResponse {
    const ERROR_OBJ: IResponse = {
      statusMessage: 'Error',
      status: 403,
      message: message,
      total: 0,
      reason: data ? data : false,
      response: undefined,
    };
    return response.status(403).json(ERROR_OBJ);
  }

  static successfulResponse(response: any, data, message): IResponse {
    type Success = Omit<IResponse, "reason"> //if you have more than one "reason" | "total" to remove from the interface
    const SUCCESS_OBJ: Success = {
      statusMessage: "Success",
      total: isArray(data) ? data.length : 1,
      status: 200,
      message: message,
      response: data ? data : true,
    };

    return response && response.status(200).send(SUCCESS_OBJ);
  }
}

export default ApiHelper;