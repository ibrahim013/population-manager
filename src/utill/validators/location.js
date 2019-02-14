import Validator from 'validator';
import isEmpty from './is-empty';

const validateLocationInput = (data) => {
  const errors = {};

  data.location = !isEmpty(data.location) ? data.location : '';
  data.sex = !isEmpty(data.sex) ? data.sex : '';

  if (!Validator.isLength(data.location, { min: 2, max: 100 })) {
    errors.location = 'name must be between 2 and 100 character';
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = 'location can not be empty';
  }

  if (Validator.isEmpty(data.sex)) {
    errors.sex = 'sex can not be empty';
  }
  if (!(Validator.equals('male', data.sex) || Validator.equals('female', data.sex))) {
    errors.sex = 'sex can only be male or female';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export default validateLocationInput;
