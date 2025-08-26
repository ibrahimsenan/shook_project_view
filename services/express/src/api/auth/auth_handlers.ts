import ApiHelp from '@utils/apiHelpers';
import lodash from 'lodash';
import util from '@utils/util'; // Assuming util has verifyAuthToken

import { Response } from 'express';

function AUTH_HANDLER(token: string, response: Response): void {
  // const { error } = Validator.validateToken({ token });
  // if (error) response.status(404).send(error.details[0].message);

  const verifyToken = util.verifyAuthToken(token);

  if (lodash.has(verifyToken, 'message')) {
    response.status(404).send(ApiHelp.errorObject([], 'Token Not Valid'));
  }
}

export default AUTH_HANDLER;
