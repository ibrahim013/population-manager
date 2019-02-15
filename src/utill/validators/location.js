import Validator from 'validator';
import isEmpty from './is-empty';

const validateLocationInput = (data) => {
  const errors = {};

  data.location = !isEmpty(data.location) ? data.location : '';
  data.male = !isEmpty(data.male) ? data.male : '';
  data.female = !isEmpty(data.female) ? data.female : '';
  if (!Validator.isLength(data.location, { min: 2, max: 100 })) {
    errors.location = 'name must be between 2 and 100 character';
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = 'location can not be empty';
  }

  if (Validator.isEmpty(data.male)) {
    errors.male = 'Number of male can not be empty';
  }
  if (Validator.isEmpty(data.female)) {
    errors.female = 'number of female can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export default validateLocationInput;
