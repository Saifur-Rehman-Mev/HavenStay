const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing  = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-Mate");
// const Review = require("./models/review.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");



app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


main()
.then(res => console.log("conneted"))
.catch(err => console.log(err));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/HavenStay");
}

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


app.get("/",(req,res)=> {
    res.send("hello this is home page")
})


app.use((err,req,res,next)=> {
    res.send("something went wrong!!")
})


app.listen(8080, () => {
     console.log("server is listeing to port 8080");
})

