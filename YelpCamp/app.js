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
seedDB();

app.use(express.static(__dirname + "/public"))

app.get('/', function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // res.render("campgrounds", { campgrounds: campgrounds });
    CampGround.find({}, function(error, allCampgrounds) {
        if (error) {
            console.log(error);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.post("/campgrounds", function(req, res) {
    let nameCampGround = req.body.name;
    let urlImage = req.body.image;
    let description = req.body.description;
    let newCampGround = { name: nameCampGround, url: urlImage, description: description };
    CampGround.create(newCampGround, function(error, newlyCreatedCampaGround) {
        if (error) {
            console.log(error)
        } else {
            res.redirect("/campgrounds");
        }
    });

});

app.get("/campgrounds/:id", function(req, res) {
    //res.send("This will be a show page one day!!!");
    CampGround.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    CampGround.findById(req.params.id, function(error, campground) {
        if (error) {
            console.log(error);
        } else {
            res.render("comments/new", { campground: campground })
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res) {
    let id = req.params.id
    CampGround.findById(id, function(error, campground) {
        if (error) {
            console.log(error);
        } else {
            Comment.create(req.body.comment, function(error, comment) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(campground);
                    campground.comments.push(comment._id);
                    campground.save(function(error) {
                        if (error) {
                            console.log(error);
                            console.log("FAILED WHILE SAVING");
                        } else {
                            res.redirect("/campgrounds/" + id);
                        }
                    });
                }
            });
        }
    });
});


app.get('*', function(req, res) {
    res.send("Page does not exist.")
});

app.listen(7000, function() {
    console.log("Yelp Camp has started.");
});