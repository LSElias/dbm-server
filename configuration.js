require('dotenv').config();

module.exports = {
    port: 80,
    jwtSecret: process.env.SECRET_KEY,
    jwtExpirationInSeconds: 60 * 120, // 2 hours
};