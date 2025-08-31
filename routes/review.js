const express = require("express");
const router  = express.Router({mergeParams:true});
const Listing  = require("../models/listing.js")
const Review = require("../models/review.js");
const { isLoggedin,  isReviewauthor } = require("../middleware/middleware.js");
const reviewController = require("../controller/review.js")


// creating reviews 

router.post("/", isLoggedin,(reviewController.createReview));


// deleting reviews

router.delete("/:reviewId",isLoggedin,isReviewauthor, (reviewController.deleteReview));

module.exports = router;