const express = require("express")
const app = express()

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true})) 

let content = [{title:"Post1",body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{title:"Post2",body:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]

app.get("/", (req,res) => {
    res.render("home",{content:content})
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
    let resContent = [];
    for(i in content){
        if(content[i].title == reqTitle){
            resContent.push(content[i]);
        }
    }
    if(resContent.length == 0){
        res.send("<h2>No such Post</h2>")
    }else{
        res.render("default", {content:resContent})
    }
})
app.post("/", (req,res) => {
    content.push({title:req.body.title,body:req.body.post})
    res.redirect("/")
})

app.listen(3000)