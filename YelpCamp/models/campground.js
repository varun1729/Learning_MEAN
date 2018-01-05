let mongoose = require("mongoose");
// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Campground", campgroundSchema);