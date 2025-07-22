require('dotenv').config();

module.exports = {
  email: process.env.QUOTEX_EMAIL,
  password: process.env.QUOTEX_PASSWORD,
  amount: parseFloat(process.env.START_AMOUNT),
  asset: process.env.ASSET,
  duration: parseInt(process.env.TRADE_DURATION),
};
