const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

//function for checking the Json Web Token for the given payload 
//also fetches the user's information for sending to the frontend
const verifyJWT = async( req, res, next ) => {
    const token = req.headers["x-access-token"]?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_secret, async (err, decoded) => {
            
            if (err) {
                console.log(err)
                return res.status(401).json({
                    isLoggedIn: false,
                    message: "Failed to Authenticate"
                })
            }
            req.isLoggedIn = true;
            
            // console.log(token)
            if (req.headers["role"] === "admin") {
                req.user = await Admin.findById(decoded.id);
            }
            else if (req.headers["role"] === "teacher") {
                req.user = await Teacher.findById(decoded.id);
            } 
            else if (req.headers["role"] === "student") {
                req.user = await Student.findById(decoded.id);
            }
            next()
        })
    }
    else {
        res.status(401).json({ message: "Please Login First", isLoggedIn: false })
    }
}

module.exports = verifyJWT;