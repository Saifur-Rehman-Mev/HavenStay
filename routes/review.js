const express = require("express");
const router  = express.Router({mergeParams:true});
// const ExpressError = require("../utils/ExpressError.js");
const Listing  = require("../models/listing.js")
// const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");

// reviews 

router.post("/", async(req,res) => {
   let listing = await Listing.findById(req.params.id);
   let newReview = new Review(req.body.review);
   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();
   res.redirect(`/listings/${listing._id}`)
})


// deleting reviews

router.delete("/:reviewId", async(req,res)=> {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`)
})

module.exports = router;