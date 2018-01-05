let express = require('express');
let router = express.Router({mergeParams: true});
let CampGround = require("../models/campground");
let Comment = require("../models/comment")

router.get("/new", isLoggedIn,  function(req, res) {
    CampGround.findById(req.params.id, function(error, campground) {
        if (error) {
            console.log(error);
        } else {
            res.render("comments/new", { campground: campground })
        }
    })
});

router.post("/", isLoggedIn, function(req, res) {
    let id = req.params.id
    CampGround.findById(id, function(error, campground) {
        if (error) {
            console.log(error);
        } else {
            Comment.create(req.body.comment, function(error, comment) {
                if (error) {
                    console.log(error);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(function(error){
                        if(error){
                            console.log(error);
                        }
                    })
                    campground.comments.push(comment._id);
                    campground.save(function(error) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.redirect("/campgrounds/" + id);
                        }
                    });
                }
            });
        }
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;