const express = require('express');
const app = express();
const port = 5000;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const path = require('path')

const Tweet = require('./models/tweets');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rerouting tweet page
app.get('/tweets/new', (req, res) => {
    res.render('tweets/new');
})

//Create Tweet
app.post('/tweets', async (req, res) => {
    const { tweet, username } = req.body;
    const result = await Tweet.create({ tweet: tweet, username: username });
    res.redirect('/tweets');
})

// Add comment
app.post('/comment/:id', async (req, res) => {
    const { id } = req.params;
    const { comment_author, comment } = req.body;
    const tweet = await Tweet.findById(id);
    tweet.comment.push({ comment_author: comment_author, comment: comment });
    await Tweet.findByIdAndUpdate(id, tweet, { new: true });
    res.redirect(`/tweets/${id}`);
})

// Fetch all tweets
app.get('/tweets', async (req, res) => {
    const tweets = await Tweet.find();
    res.render('tweets/index', {tweets});
})

// View Specific Tweet
app.get('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    const tweet = await Tweet.findOne({ _id: id });
    res.render('tweets/show', { tweet });
})

// Update Tweet
app.patch('/tweets/:id', async(req, res) => {
    const { id } = req.params;
    const newTweetText = req.body.tweet;
    const foundTweet = await Tweet.findByIdAndUpdate(id, { tweet: newTweetText }, { new: true});
    res.redirect("/tweets")
})

// Form to edit a specific tweet
app.get('/tweets/:id/edit', async (req, res) => {
    const { id } = req.params;
    const tweet = await Tweet.findOne({ _id: id });
    res.render('tweets/edit', { tweet })
})

// Delete
app.delete('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    await Tweet.findByIdAndRemove(id);
    res.redirect('/tweets')
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}...`);

})