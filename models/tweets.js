const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jaylawrence:7sdM0DWZeln5Ufb1@movieapp.qqetypl.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Connection Open");
})
.catch(err => {
    console.log("Error");
    console.log(err)
})

const tweetSchema = mongoose.Schema({
    tweet: String,
    username: String,
    comment: [
        {
            comment_author: String,
            comment: String,
        }
    ]
})

module.exports = mongoose.model('Tweet', tweetSchema); 