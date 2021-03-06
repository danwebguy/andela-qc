import Validator from 'validator';
import isEmpty from './is-empty';

const validateMeetupInput = (data) => {
  const errors = {};

  data.createdOn = !isEmpty(data.createdOn) ? data.createdOn : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.topic = !isEmpty(data.topic) ? data.topic : '';
  data.happeningOn = !isEmpty(data.happeningOn) ? data.happeningOn : '';
  data.tags = !isEmpty(data.tags) ? data.tags : '';

  if (!Validator.isLength(data.location, { min: 2, max: 30 })) {
    errors.location = 'location field is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'location field is required';
  }

  if (!Validator.isLength(data.topic, { min: 6, max: 100 })) {
    errors.topic = 'topic must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.topic)) {
    errors.topic = 'topic field is required';
  }

  if (!Validator.isLength(data.happeningOn, { min: 6, max: 30 })) {
    errors.happeningOn = 'happeningOn Date field is required';
  }

  if (Validator.isEmpty(data.happeningOn)) {
    errors.happeningOn = 'happeningOn field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateMeetupInput;
