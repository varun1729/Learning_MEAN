let express = require('express');
let router = express.Router({ mergeParams: true });
let CampGround = require("../models/campground");
let Comment = require("../models/comment")

router.get("/new", isLoggedIn, function(req, res) {
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
                    comment.save(function(error) {
                        if (error) {
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

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(error, foundComment) {
                if (error) {
                    console.log(error);
                } else {
                    if (foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        console.log("not your comment");
                    }
                }
            });
    } else {
        res.redirect("/login");
    }
}

router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
    console.log("hello");
    CampGround.findById(req.params.id, function(error, campground) {
        if (error) {
            console.log(error);
        } else {
            Comment.findById(req.params.comment_id, function(error, comment) {
                if (error) {
                    console.log(error);
                } else {
                    res.render("comments/edit", { campground: campground, comment: comment });
                }
            });
        }
    });
});

router.put("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, updatedComment) {
        if (error) {
            console.log(error);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(error) {
        if (error) {
            console.log(error);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;