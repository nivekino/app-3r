const express = require('express');
const router = express.Router();
const authHttpHandler = require('../libs/auth/auth');

router.route('/login')
    .post(authHttpHandler.loginUser);

/* Creating a route for the signup page. */
router.route('/signup')
    .post(authHttpHandler.createUser);

exports.router = router;
