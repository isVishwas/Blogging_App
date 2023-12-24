const User = require('../models/user');
// const Otp = require('../../models/Otp/OtpModel');
// const Post = require('../models/postModel');
const catchAsync = require('../middlewares/catchAsync');
const ErrorHandler = require('../utils/errorHandler');
// const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
// const { generateOtp, verifyOtp } = require('../../utils/otp');
const { default: slugify } = require('slugify');
const { generateFromEmail } = require('unique-username-generator');
// const { deleteFile } = require('../utils/awsFunctions');

// Signup User
exports.signup = catchAsync(async (req, res, next) => {

    const {
        username,
        email,
        password
    } = req.body;

    console.log("body =>",req.body)

    const user = await User.findOne({
        $or: [{ email }]
    });

    if (user?.email == email)
        return next(new ErrorHandler("Email already exists", 500));

    const newAdmin = await User.create({
        username,
        email,
        password
    });

    res.status(200).json({
        success: true,
        admin: newAdmin,
        message: "User Created Successfully!"
    });


});

exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({
        email
    }).select('+password');

    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password doesn't match", 400));
    }
    const token = await user.generateToken();
    user.token = token; //save to db
    user.save();

    res.status(200).json({
        success: true,
        user,
        token: await user.generateToken(),
        message: "Login Successfully!",
    });
});

// Get Admin Details --Logged In Admin
exports.getAccountDetails = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user,
    });
});
































