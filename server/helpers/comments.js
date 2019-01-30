import Validator from 'validator';
import isEmpty from './is-empty';

const validateCommentsInput = (data) => {
  const errors = {};

  data.comment = !isEmpty(data.comment) ? data.comment : '';
  if (Validator.isEmpty(data.comment)) {
    errors.comment = 'comment is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateCommentsInput;
