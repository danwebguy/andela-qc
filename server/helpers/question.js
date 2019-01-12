import Validator from 'validator';
import isEmpty from './is-empty';

const validateQuestionInput = (data) => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.body = !isEmpty(data.body) ? data.body : '';

  if (!Validator.isLength(data.title, { min: 6, max: 50 })) {
    errors.title = 'the title of the question must be between 6 and 50 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }

  if (!Validator.isLength(data.body, { min: 6, max: 300 })) {
    errors.body = 'the body of the question must be between 6 and 300 characters';
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = 'body field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateQuestionInput;
