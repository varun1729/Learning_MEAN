let express = require("express");
let app = express();
app.set("view engine", "ejs");

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

let CampGround = require("./models/campground");
let Comment = require("./models/comment")
let seedDB = require("./seeds");

let passport = require("passport");
let LocalStratergy = require("passport-local");
let User = require("./models/user");

let commentsRoutes = require("./routes/comments");
let campgroundsRoutes = require("./routes/campgrounds");
let authRoutes = require("./routes/auth");
let methodOverride = require("method-override");
app.use(methodOverride("_method"));


app.use(require("express-session")({
    secret: "JS IS FUN <3",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDB();

app.use(express.static(__dirname + "/public"))

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/",authRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);


// app.get('/', function(req, res) {
//     res.render("landing");
// });

// app.get("/campgrounds", function(req, res) {
//     // res.render("campgrounds", { campgrounds: campgrounds });
//     CampGround.find({}, function(error, allCampgrounds) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user});
//         }
//     })
// });


// app.post("/campgrounds", function(req, res) {
//     let nameCampGround = req.body.name;
//     let urlImage = req.body.image;
//     let description = req.body.description;
//     let newCampGround = { name: nameCampGround, url: urlImage, description: description };
//     CampGround.create(newCampGround, function(error, newlyCreatedCampaGround) {
//         if (error) {
//             console.log(error)
//         } else {
//             res.redirect("/campgrounds");
//         }
//     });

// });

// app.get("/campgrounds/:id", function(req, res) {
//     //res.send("This will be a show page one day!!!");
//     CampGround.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.render("campgrounds/show", { campground: foundCampground });
//         }
//     });
// });

// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
//     CampGround.findById(req.params.id, function(error, campground) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.render("comments/new", { campground: campground })
//         }
//     })
// });

// app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
//     let id = req.params.id
//     CampGround.findById(id, function(error, campground) {
//         if (error) {
//             console.log(error);
//         } else {
//             Comment.create(req.body.comment, function(error, comment) {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     console.log(campground);
//                     campground.comments.push(comment._id);
//                     campground.save(function(error) {
//                         if (error) {
//                             console.log(error);
//                             console.log("FAILED WHILE SAVING");
//                         } else {
//                             res.redirect("/campgrounds/" + id);
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });

// //AUTH ROUTES

// app.get("/register", function(req, res){
//     res.render("register");
// });

// app.post("/register", function(req,res){
//     User.register(new User({username: req.body.username}), req.body.password, function(error,user){
//         if (error){
//             console.log(error)
//             res.render("register");
//         } else {
//             passport.authenticate("local")(req,res, function(){
//                 res.redirect("/campgrounds");
//             });
//         }
//     });
// });

// app.get("/login", function(req,res){
//     res.render("login");
// })

// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/campgrounds");
// })

// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/campgrounds", 
//     failureRedirect: "/login" 
// }), function(req,res){
// });

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     } 
//     res.redirect("/login");
// }

// app.get('*', function(req, res) {
//     res.send("Page does not exist.")
// });

app.listen(7000, function() {
    console.log("Yelp Camp has started.");
});