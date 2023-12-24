const express = require('express');
const {
    create_article,
    delete_article,
    edit_article,
    get_article_by_id,
    get_article_by_user_id,
    get_all_articles
} = require('../controllers/articleController');
const { isAuthenticated } = require('../middlewares/auth/admin');
const router = express();


router.route("/article")
.get(isAuthenticated,get_article_by_user_id)
.post(isAuthenticated,create_article)

router.route("/article/all")
.get(isAuthenticated,get_all_articles)

router.route("/article/:id")
.get(isAuthenticated,get_article_by_id)
.delete(isAuthenticated,delete_article)
.patch(isAuthenticated,edit_article)

module.exports = router;