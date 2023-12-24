const Article = require('../models/article');
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



exports.get_article_by_user_id = catchAsync(async (req, res, next) => {

    const articles = await Article.find({ created_by: req.user._id }).sort({createdAt:-1});

    if (articles.length) {
        res.status(200).json({
            success: true,
            articles,
            message: "Article found successfully!"
        });
    } else {
        return next(new ErrorHandler("No Articles found", 500));
    }
});


exports.get_article_by_id = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const article = await Article.findOne({ _id : id }).sort({createdAt:-1});

    if (article) {
        res.status(200).json({
            success: true,
            article,
            message: "Article found successfully!"
        });
    } else {
        return next(new ErrorHandler("No Articles found", 500));
    }
});

exports.get_all_articles = catchAsync(async (req, res, next) => {

    const all_articles = await Article.find({}).sort({createdAt:-1}).populate('created_by');

    if (all_articles.length) {
        res.status(200).json({
            success: true,
            all_articles,
            message: "Article found successfully!"
        });
    } else {
        return next(new ErrorHandler("No Articles found", 500));
    }
});


exports.create_article = catchAsync(async (req, res, next) => {

    const {
        title,
        content
    } = req.body;

    await Article.create({
        title,
        content,
        created_by: req.user._id
    });

    res.status(200).json({
        success: true,
        message: "Article created successfully!",
    })
});

exports.edit_article = catchAsync(async (req, res, next) => {

    const {
        title,
        content
    } = req.body;

    const { id } = req.params;

    await Article.findOneAndUpdate({ _id: id }, {
        $set: {
            title,
            content
        }
    }, { new: true });

    res.status(200).json({
        success: true,
        message: "Article updated successfully!",
    })
});


exports.delete_article = catchAsync(async (req, res, next) => {

    const {
        id
    } = req.params;

    await Article.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Article deleted successfully!",
    })
});


