const express = require("express");
const router  = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const Listing  = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/",wrapAsync (async (req,res)=> {
    const allListing = await Listing.find({});
    res.render("Listings/index.ejs", {allListing});
}))

//  new listings 
router.get("/new", (req,res) => {
        res.render("listings/new.ejs");
})

// show route 
router.get("/:id",wrapAsync(async (req,res)=> {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    console.log(listing);
    res.render("Listings/show.ejs", {listing});
}))

// create route 
router.post("/",wrapAsync(async (req,res,next)=> {
    // const newListing = new Listing(req.body.listing);
    // await newListing.save();
    // res.redirect("/listings");
    if(!req.body.listing){
        throw new ExpressError(400, "send valid data for listings")
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
} ))

// edit route

router.get("/:id/edit", wrapAsync(async(req,res)=> {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/edit.ejs", {listing});
}))

router.put("/:id", wrapAsync(async (req,res)=> {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect("/listings");
}))

// Delete route 

router.delete("/:id",wrapAsync(async(req,res)=> {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

module.exports = router; 