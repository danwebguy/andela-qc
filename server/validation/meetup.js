import Validator from 'validator';

export default (data) => {
  const errors = {};

  if (!Validator.isLength(data.topic, { min: 2, max: 30 })) {
    errors.topic = 'Topic must be between 2 and 30 characters';
  }

  return {
    errors,
    isValid: errors,
  };
};
