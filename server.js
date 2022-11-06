const express = require('express');
const mongoose = require('mongoose');
const { UserRouter } = require('./user');
const { ArticleRouter} = require('./article');

const PORT = 5000

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('/users', UserRouter);
app.use('/articles', ArticleRouter);


mongoose.connect('mongodb://localhost:27017/blog')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})