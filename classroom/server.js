const express = require("express");
const app = express();
const users = require("./router/user.js");
const posts = require("./router/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

let sessionOption = {secret:"mysecretstring", resave: false, saveUninitialized: true}
app.use(session(sessionOption));
app.use(flash());

// app.get("/test",(req,res)=> {
//      if(req.session.score){
//      req.session.score++
//      }else{
//            req.session.score = 1;
//      }    
//      res.send(`test score ${req.session.score}`);
// });

app.get("/register", (req,res)=> {
     let {name="saifurrehman"} = req.query;
     req.session.name = name; 
     req.flash("register","user is register");
     res.redirect("/hello")
})
app.get("/hello", (req,res)=> {
     res.render("page.ejs", {name: req.session.name, msg: req.flash("register")})
})


app.listen(3000, () => {
     console.log("server is listeing to port 3000");
})