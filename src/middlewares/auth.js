const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {

    try {

        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Please login");
        }

        const decodedMessage = jwt.verify(token, process.env.JWT_SECRET);

        const { _id } = decodedMessage;
        console.log("Logged in user is: " + _id);
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exist");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error retrieving user profile: " + error.message);
    }
};

module.exports = {
    userAuth
}