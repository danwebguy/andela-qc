import Validator from 'validator';
import isEmpty from './is-empty';

const validateRsvpInput = (data) => {
  const errors = {};

  data.status = !isEmpty(data.status) ? data.status : '';
  if (!Validator.isIn(data.status, ['yes', 'maybe'])) {
    errors.status = 'please enter yes or maybe';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'status is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateRsvpInput;
