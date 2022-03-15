//3rd Party Modules
const jwt = require('jsonwebtoken');

//Local Modules
const HttpError = require('../models/http-errors');

module.exports = (req, res, next) =>{
    //We are extracting token from header we can use url also but not body
    //because get and other some request may not use body
    if (req.method === 'OPTIONS') {
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];  //Authorization: 'Bearer TOKEN'
        if(!token)
        {
            throw new Error('Authentication Failed')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch(err){
        const error = new HttpError('Authentication Failed', 401);
        return next(error);
    }
}
