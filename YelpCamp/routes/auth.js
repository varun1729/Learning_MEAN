let express = require('express');
let router = express.Router();
let passport = require("passport");
let User = require("../models/user")

router.get('/', function(req, res) {
    res.render("landing");
});


router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(error,user){
        if (error){
            console.log(error)
            res.render("register");
        } else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req,res){
    res.render("login");
})

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds", 
    failureRedirect: "/login" 
}), function(req,res){
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;

