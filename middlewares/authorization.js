const jwt = require('jsonwebtoken');
const _ = require('lodash');
const httpErrors = require('http-errors');
const { JVT_SECRET } = process.env;

const authorization = async (req, res, next) => {
  try {

    if (['/users/login'].includes(req.path)) {
      next();
      return;
    }
    if(req.method === 'OPTIONS'){
      next();
      return;
    }

    const token = req.headers['x-authorization'];
console.log(token)
    let user = {};
    try {
      user = jwt.decode(token, JVT_SECRET)
    } catch (e) {

    }

    if (_.isEmpty(user)) {
      throw httpErrors(401, 'Unauthorized');
    }


    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authorization;
