// @ts-nocheck
import jwt from 'jsonwebtoken';
import 'dotenv/config'

module.exports.validateAccessToken = function(token) {
  try {
    const userData = jwt.verify(token, process.env.SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
}