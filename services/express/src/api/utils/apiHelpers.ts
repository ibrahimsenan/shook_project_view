import jwt, { JwtPayload, SignOptions, VerifyErrors } from 'jsonwebtoken';
import lodash from 'lodash';
import { Response } from 'express';

interface User {
  email_address: string;
  userName: string;
  user_id: string | number;
}

interface ApiResponse<T = unknown> {
  statusMessage: string;
  status: number;
  message?: string;
  reason?: unknown;
  response?: T | boolean;
}

class ApiHelper {
  static response: Response | null = null;

  errorObject(error: unknown, message?: string): ApiResponse {
    return {
      statusMessage: 'ERROR',
      status: 403,
      message,
      reason: error,
      response: undefined,
    };
  }

  generateID(): string {
    return String(Math.floor(Math.random() * 10_000_000_000));
  }

  successObject<T>(data: T, message?: string): ApiResponse<T> {
    return {
      statusMessage: 'SUCCESS',
      status: 200,
      message,
      response: data,
    };
  }

  generateAuthToken(user: User): string {
    const payload = {
      emailAddress: user.email_address,
      user_name: user.userName,
      userId: user.user_id,
    };

    const options: SignOptions = { expiresIn: '5h' };
    return jwt.sign(payload, 'dineIn_jwtPrivateKey', options); // replace with config later
  }

  verifyAuthToken(token: string): JwtPayload | string | VerifyErrors | null {
    let responseToken: JwtPayload | string | VerifyErrors | null = null;

    jwt.verify(
      token,
      'dineIn_jwtPrivateKey',
      { expiresIn: '5h' },
      (error, verified) => {
        if (error) {
          responseToken = error;
        } else {
          responseToken = verified as JwtPayload;
        }
      },
    );

    return responseToken;
  }

  objectOmit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
    const objectString = JSON.stringify(object);
    return lodash.omit(JSON.parse(objectString), keys) as Omit<T, K>;
  }

  errorResponse(response: Response, data?: unknown, message?: string) {
    const ERROR_OBJ: ApiResponse = {
      statusMessage: message ?? 'Error with not found!',
      status: 403,
      message,
      reason: data ?? false,
      response: undefined,
    };
    return response.status(403).json(ERROR_OBJ);
  }

  successfulResponse<T>(response: Response, data: T, message?: string) {
    const SUCCESS_OBJ: ApiResponse<T> = {
      statusMessage: message ?? 'success',
      status: 200,
      message,
      response: data ?? true,
    };
    return response.status(200).send(SUCCESS_OBJ);
  }
}

export default ApiHelper;
