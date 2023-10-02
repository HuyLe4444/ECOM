const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyTokenUser = (req, res, next) => {
    const verifyHeader = req.header('auth-token');
    if(!verifyHeader) return res.send('Access Denied');

    try {
        const verified = jwt.verify(verifyHeader, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (err) {
        res.send('Invalid Token');
    }
}

const verifyTokenAdmin = (req, res, next) => {
    verifyTokenUser(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.send('You are not allowed to do that');
        }
    })
}

module.exports.verifyTokenUser = verifyTokenUser;
module.exports.verifyTokenAdmin = verifyTokenAdmin;
