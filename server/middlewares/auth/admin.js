const jwt = require('jsonwebtoken');
const User = require("../../models/user");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsync = require("../catchAsync");

exports.isAuthenticated = catchAsync(async (req, res, next) => {

    var token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }

    if (!token) {
        return next(new ErrorHandler("error! Unauthorized", 401));
    }
});






