let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let methodOverride = require("method-override");
let sanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(sanitizer());

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now,
    }
});
let Blog = mongoose.model("Blog", blogSchema);

Blog.create({
	title: "First Blog Post!",
	image: "https://images.unsplash.com/photo-1483919283443-8db97e2bcd81?auto=format&fit=crop&w=1650&q=80",
	body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper scelerisque ante eu faucibus. Nullam rhoncus tempor ultrices. Phasellus et ante quis metus bibendum ultricies a vel justo. Proin vitae fringilla felis, eget commodo eros. Nulla maximus est tortor, eget interdum lorem gravida sit amet. In finibus tempor nulla non blandit. Vivamus bibendum lorem mi, nec maximus nunc luctus et. Etiam aliquet felis vel sem bibendum cursus vel sit amet est. Phasellus quis odio id elit commodo ultrices eget eget nulla. Vestibulum convallis nulla nisi, malesuada ultrices massa dignissim ac. Sed accumsan rutrum sapien, at commodo magna posuere ut. Vivamus tincidunt convallis erat eu facilisis. Suspendisse sollicitudin dui eu faucibus aliquet. Sed mollis faucibus nisl, sollicitudin dictum mauris tincidunt sit amet. Aenean ullamcorper mollis egestas. Duis maximus commodo velit non finibus.",
});

app.get('/', function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find(function(error, blogs) {
        if (error) {
            console.log("SOMETHING WENT WRONG WITH RETRIEVING THE BLOGS");
            console.log(error);
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.post("/blogs", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(error, newBlogCreared) {
        if (error) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req, res) {
    console.log(req.params.id);
    Blog.findById(req.params.id, function(error, foundBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    });
});

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog) {
        if (error) {
            console.log(error);
        } else {
            res.render("edit", { blog: foundBlog });
        }
    });
});

app.put("/blogs/:id", function(req, res) {
    console.log("Putiing");
    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog) {
        if (error) {
            console.log("error")
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res) {
    console.log("DELETING");
    Blog.findByIdAndRemove(req.params.id, function(error) {
        if (error) {
            console.log(error)
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get('*', function(req, res) {
    res.send("This page does not exist");
});

app.listen(7000, function() {
    console.log("Server is running.");
});