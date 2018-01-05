let express = require('express');
let router = express.Router({mergeParams: true});
let CampGround = require("../models/campground");
let Comment = require("../models/comment")
console.log("CampGround");

router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.post("/", isLoggedIn, function(req, res) {
    let nameCampGround = req.body.name;
    let urlImage = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username,
    };
    let newCampGround = { name: nameCampGround, url: urlImage, description: description, author: author};
    CampGround.create(newCampGround, function(error, newlyCreatedCampaGround) {

        if (error) {
            console.log(error)
        } else {
            res.redirect("/campgrounds");
        }
    });

});

router.get("/", function(req, res) {
    // res.render("campgrounds", { campgrounds: campgrounds });
    CampGround.find({}, function(error, allCampgrounds) {
        if (error) {
            console.log(error);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
});

router.get("/:id", function(req, res) {
    CampGround.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// router.get("/n", function(req, res) {
//     res.send("hit")
//     // res.render("campgrounds/new");
// });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;