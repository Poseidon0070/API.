const mongoose = require("mongoose")
let postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }
})

module.exports = postSchema