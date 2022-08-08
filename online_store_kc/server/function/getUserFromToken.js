const jwt = require('jsonwebtoken');

function getUserFromToken(headersAuthorization) {
    const token = headersAuthorization.split(' ')[1];
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = getUserFromToken;