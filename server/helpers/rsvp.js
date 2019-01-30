import Validator from 'validator';
import isEmpty from './is-empty';

const validateRsvpInput = (data) => {
  const errors = {};

  data.response = !isEmpty(data.response) ? data.response : '';
  if (!Validator.isIn(data.response, ['yes', 'no', 'maybe'])) {
    errors.response = 'please enter yes or maybe';
  }

  if (Validator.isEmpty(data.response)) {
    errors.response = 'response is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateRsvpInput;
