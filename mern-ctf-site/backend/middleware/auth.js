const jwt = require("jsonwebtoken");

require('dotenv').config()

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log('verifying...')
    if (!token) {
        console.log('no token')
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.log('unauth')
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJWT = {
    verifyToken
};

module.exports = authJWT;