const express = require("express")
const mongoose = require("mongoose")
const _ = require("lodash")
const app = express()
const postSchema = require("./public/script/postSchema")

mongoose.connect("mongodb://127.0.0.1:27017/Blog-Website").then(() => console.log("connected!"))

let Post = mongoose.model("Post",postSchema)

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true})) 

let defaultContent = [{title:"Post1",body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{title:"Post2",body:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]

app.get("/", (req,res) => {
    Post.find({})
    .then((contents) => {
        if(contents.length === 0){
            Post.insertMany(defaultContent)
            .then(() => res.redirect("/"))
        }else{
            res.render("home",{content:contents})
        }
    })
    .catch((err) => console.log(err))
})

app.get("/compose", (req,res) => {
    res.render("compose")
}) 

app.get("/about", (req,res) => {
    res.render("about")
})

app.get("/contact", (req,res) => {
    res.render("contact")
})

app.get("/:postName", (req,res) => {
    let reqTitle = req.params.postName;
    Post.findOne({title : reqTitle})
    .then((post) => {
        if(!post){
            res.send("<h2>No such post exist!</h2>")
        }else{
            res.render("default",{post : post})
        }
    })
    .catch((err) => console.log(err))
})

app.post("/", (req,res) => {
    let newPost = new Post({
        title : req.body.title,
        body : req.body.body
    })
    newPost.save()
    .then(() => res.redirect("/"))
})

app.listen(3000)