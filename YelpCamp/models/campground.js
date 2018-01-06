let mongoose = require("mongoose");
// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    author: {
    	id : {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User",
    	},
    	username: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Campground", campgroundSchema);