/**
 * @Middleware for check origins
 */


const header = (req, res, next) => {
  try {
    const origins = ['http://localhost:3000', 'http://192.168.43.24:3000'];

    if (req.type === 'OPTIONS') {
      return next();
    }

    if (origins.includes(req.headers.origin)) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header('Access-Control-Allow-Headers', '*');
    }


    next();
  }catch (e) {
    
  }
};

module.exports = header;
