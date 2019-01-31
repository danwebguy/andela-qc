import Validator from 'validator';
import isEmpty from './is-empty';

const validateUserInput = (data) => {
  const errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'firstname is required';
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'lastname field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'email field is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = 'phonenumber field is required';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'username field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be more than 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateUserInput;
