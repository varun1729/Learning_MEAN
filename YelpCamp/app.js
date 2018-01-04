let express = require("express");
let app = express();
app.set("view engine", "ejs");

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

let campgroundSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
});

let CampGround = mongoose.model("Campground", campgroundSchema);

// CampGround.create({
//     name: "Salt Water Creek",
//     url: "https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png",
//     description: "A nice campsite next to salt water creek. Real salty!!!",
// }, function(err, campground) {
//     if (err) {
//         console.log("COULD NOT SAVE CAMPGROUND");
//     } else {
//         console.log("CAMPGROUND SAVED");
//         console.log(campground);
//     }
// });

// CampGround.create({
//     name: "Columbia Gorge",
//     url: "http://www.lake-grapevine.com/wp-content/uploads/2010/10/Meadowmere-Park-Camping-small.jpg",
//     description: "A nice campsite next to Columbia Gorge. Real cold!!!",
// }, function(err, campground) {
//     if (err) {
//         console.log("COULD NOT SAVE CAMPGROUND");
//     } else {
//         console.log("CAMPGROUND SAVED");
//         console.log(campground);
//     }
// });

// let campgrounds = [
//     // { name: "Salt Water Creek", url: "https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png", },
//     // { name: "Columbia Gorge", url: "http://www.lake-grapevine.com/wp-content/uploads/2010/10/Meadowmere-Park-Camping-small.jpg", },
//     // { name: "Salt Water Creek", url: "https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png", },
//     // { name: "Columbia Gorge", url: "http://www.lake-grapevine.com/wp-content/uploads/2010/10/Meadowmere-Park-Camping-small.jpg", },
//     // { name: "Salt Water Creek", url: "https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png", },
//     // { name: "Columbia Gorge", url: "http://www.lake-grapevine.com/wp-content/uploads/2010/10/Meadowmere-Park-Camping-small.jpg", },
//     // { name: "Salt Water Creek", url: "https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png", },
//     // { name: "Columbia Gorge", url: "http://www.lake-grapevine.com/wp-content/uploads/2010/10/Meadowmere-Park-Camping-small.jpg", },
// ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // res.render("campgrounds", { campgrounds: campgrounds });
    CampGround.find({}, function (error, allCampgrounds){
        if (error){
            console.log("Error in obtaing campgrounds");
        } else{
            res.render("index", { campgrounds: allCampgrounds });
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res) {
    let nameCampGround = req.body.name;
    let urlImage = req.body.image;
    let description = req.body.description;
    let newCampGround = { name: nameCampGround, url: urlImage, description: description};
    CampGround.create(newCampGround, function (error, newlyCreatedCampaGround){
        if (error){
            console.log("Could not create camp ground")
            console.log(error)
        } else {
            console.log(newlyCreatedCampaGround);
            res.redirect("/campgrounds");
        }
    });

});

app.get("/campgrounds/:id", function (req,res){
    //res.send("This will be a show page one day!!!");
    CampGround.findById(req.params.id, function (err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show",{campground: foundCampground});
        }
    });
});

app.get('*', function(req, res) {
    res.send("Page does not exist.")
});

app.listen(7000, function() {
    console.log("Yelp Camp has started.");
});