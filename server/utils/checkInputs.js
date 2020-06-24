import validator from 'validator';
import winston from '../config/winston';

const checkInput = (inputValue) => {
  winston.info('>>> check >>>', inputValue);
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
      if (key === 'name' || key === 'surname') {
        if (!validator.isLength(inputValue[key], { min: 3 })) {
          errors[key] = `${key} must be between 3 to 50 characters`;
        }
      }

      if (key === 'name' || key === 'surname') {
        if (inputValue[key].search(/[^A-Za-z\s]/) !== -1) {
          errors[key] = `${key} can only be alphabetical`;
        }
      }

      if (key === 'description' || key === 'body') {
        if (!validator.isLength(inputValue[key], { min: 10 })) {
          errors[key] = `${key} must be between 10 to 100 characters`;
        }
      }

      if (key === 'status') {
        if (!['active', 'inactive', 'declined', 'completed'].includes(inputValue[key])) {
          errors[
            key
          ] = 'please pick between these four options for status type [\'active\',\'inactive\',\'declined\', \'completed\']';
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
