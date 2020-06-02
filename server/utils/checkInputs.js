import validator from 'validator';
import winston from '../config/winston';

const checkInput = (inputValue) => {
  winston.info('>> check >>>', inputValue);
  const errors = {};
  Object.keys(inputValue).forEach((key) => {
    if (
      !inputValue[key]
      || validator.isEmpty(String(inputValue[key]))
      || String(inputValue[key]).trim() === ''
      || inputValue[key] === ''
    ) {
      errors[key] = `${key} field can not be blank`;
    } else {
      /*
       *input Validation
       */
      if (key === 'event_title') {
        if (!validator.isLength(inputValue[key], { min: 10 })) {
          errors[key] = `${key} must be between 10 to 50 characters`;
        }
      }
      if (key === 'description' || key === 'body') {
        if (!validator.isLength(inputValue[key], { min: 10 })) {
          errors[key] = `${key} must be between 10 to 100 characters`;
        }
      }

      if (key === 'participation_type') {
        if (!['active', 'inactive', 'declined', 'completed'].includes(inputValue[key])) {
          errors[
            key
          ] = 'please pick between these three options for participation type [\'individual\',\'team\',\'both\']';
        }
      }

      if (key === 'id' || key === 'assigneeId' || key === 'projectId') {
        if (!validator.isNumeric(String(inputValue[key]))) {
          errors[
            key
          ] = `Please provide a valid ${key},an ${key} can only be a number`;
        }
      }


      if (key === 'email') {
        if (!validator.isEmail(inputValue[key])) {
          errors[key] = `Invalid ${key}`;
        }
      }
    }
  });
  return errors;
};
export default checkInput;
