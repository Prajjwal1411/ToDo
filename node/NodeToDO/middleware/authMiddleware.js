const jwt = require('jsonwebtoken');
const secretKey='token'

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.json({ 
            status:467,
            success: false,
             msg: 'Unauthorized access. Please login.' });
    }

    jwt.verify(token,secretKey, (err, decoded) => {
        if (err) {
            return res.json({ 
                status:487,
                success: false, 
                msg: 'Invalid token. Please login again.' 
            });
        }
        next();
    });
};

module.exports = authMiddleware;
