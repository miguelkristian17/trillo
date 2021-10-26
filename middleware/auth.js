const jwt = require('jsonwebtoken');
const config = require('config');

//Checks if token is valid 
module.exports = function(req, res, next) {

    const token = req.header('x-auth-token');
    const jwtSecret = config.get("jwtSecret")

    if(!token) {
        return res.status(401).json({msg: "No token. Authorization denied"})
    }
    
    try {
        jwt.verify(token,jwtSecret , (error, decoded) => {
        if (error) {
            return res.status(401).json({ msg: 'Token is not valid' });
        } else {
            req.user = decoded.user;
            next();
        }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}