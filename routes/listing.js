const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../model/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router
.route("/")
.get(wrapAsync (listingController.index))
.post( isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));


// New Route 
router.get("/new", isLoggedIn, listingController.renderNewForm );

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.get(wrapAsync(listingController.showListing))
.put( isLoggedIn, upload.single('listing[image]'),validateListing, isOwner, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync (listingController.destroyListing));

// Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;