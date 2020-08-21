const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set('view engine', 'ejs')


const homeText = "This is the home text that I've to inlclud in the home page of ejs"
const aboutText = "This is the about us page I'm a college student and I'm wokring on web developement"
const contactText = "You can contact us at our email 12ashutosh@gmail.com or phone number 7000370779"
const posts = []



app.get("/", function (req, res) {
    res.render("home", { content: homeText, postLists:posts })
})

app.get("/posts/:postName", function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);

        if (requestedTitle == storedTitle) {
            res.render("post", { postTitle: post.title, postContent: post.post })
            console.log(posts.post)
        }

    })

    res.redirect('/')
})

app.get("/about", function (req, res) {
    res.render("about", { content: aboutText })
})
app.get("/contact", function (req, res) {
    res.render("contact", { content: contactText })
})
app.get("/compose", function (req, res) {
    res.render("compose")
})

app.post("/compose", function (req, res) {
    const postObject = {
        title: req.body.newPostTitle,
        post: req.body.newPostContent
    }
    posts.push(postObject)
    res.redirect("/")
})

app.listen( 3000, function () {
    console.log("Server is running on http://localhost:3000")
})