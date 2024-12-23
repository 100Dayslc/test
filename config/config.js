require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  referralPoints: 50,
  adPoints: 10,
};
