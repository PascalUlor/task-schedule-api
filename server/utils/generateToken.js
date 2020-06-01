import jwt from 'jsonwebtoken';
import requestHandler from './requestHandler';

const generateToken = (res, statusCode, message, user) => {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: '1 day',
  };
  const result = jwt.sign(
    payload,
    process.env.SECRET || 'testing test',
    options,
  );
  return requestHandler.success(res, statusCode, message, { token: result });
};


export default generateToken;
