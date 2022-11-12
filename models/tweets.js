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
    tweet: { type: String, required: true },
    username: { type: String, required: true },
    comment: [
        {
            comment_author: { type: String },
            comment: { type: String },
        }
    ]
})

module.exports = mongoose.model('Tweet', tweetSchema); 
