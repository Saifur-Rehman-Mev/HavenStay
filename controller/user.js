const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware/middleware.js")

module.exports.signupPage = (req,res) => {
    res.render("users/signup.ejs")
};

module.exports.signupForm = async(req,res)=> {
    try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registerUser =  await User.register(newUser,password);
    req.login(registerUser, (err)=> {
        if(err){
            return next(err);
        }
    req.flash("success", "Welcome To HavenStay!");
    res.redirect("/listings");
    })
    } catch(e){
        req.flash("error", "user Already Registered!");
        res.redirect("/signup");
    }
};

module.exports.loginPage =  (req,res)=> {
    res.render("users/login.ejs");
}

module.exports.login =  async(req,res)=> {
    req.flash("success","Welcome back to HavenStay!, ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

}

module.exports.logOut =  (req,res,next)=> {
    req.logout((err)=> {
        if(err){
            return next(err);
        }
        req.flash("success", "You'are Logged Out!" );
        res.redirect("/listings");
    })
}
