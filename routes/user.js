const express = require("express");
const router  = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware/middleware.js");

const userController = require("../controller/user.js");


// display signup page
router.route("/signup")
.get((userController.signupPage))
.post((userController.signupForm));

// display login page 
router.route("/login")
.get((userController.loginPage))
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}),(userController.login));

// logout
router.get("/logout",(userController.logOut));


module.exports = router;