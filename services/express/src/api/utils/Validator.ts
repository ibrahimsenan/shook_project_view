import Joi from "joi"

type ValidatorSchema = {
  userName: string,
  password: string
}

type ExtendedValidatorSchema = ValidatorSchema & {
  new_Password: any
}

class Validator {
  static validateUser(user: ValidatorSchema) {
    const schema = Joi.object({
      userName: Joi.string().min(5).max(200).required(),
      password: Joi.string().min(5).max(200).required(),
    });
    return schema.validate(user);
  }

  static validateToken(token: ValidatorSchema) {
    const schema = Joi.object({
      token: Joi.string().min(20).required(),
    });
    return schema.validate(token);
  }

  validateChangePassword(user: ExtendedValidatorSchema) {
    const schema = Joi.object({
      userName: Joi.string().min(5).max(200).required(),
      password: Joi.string().min(5).max(200).required(),
      new_Password: Joi.string().min(5).max(200).required(),
    });
    return schema.validate(user);
  }
}

// module.exports = Validator;
//exports.validate = { validateUser, validateToken };

export default Validator