const express = require("express");
const router  = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const Listing  = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin,isOwner} = require("../middleware/middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})



// index and create route 
router.route("/")
.get(wrapAsync(listingController.index))
.post(upload.single("listing[image]"),
wrapAsync(listingController.newRoute));



//  new listings 
router.get("/new", isLoggedin, (listingController.newForm));


// show route & update route & delete route 

router.route("/:id")
.get(wrapAsync(listingController.showRoute))
.put(isLoggedin,isOwner, upload.single("listing[image]"),wrapAsync(listingController.updateRoute))
.delete(isLoggedin,isOwner,wrapAsync(listingController.deleteRoute));


// edit route

router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.editRoute));


module.exports = router; 