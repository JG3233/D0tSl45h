const mongoose = require('mongoose')

const Schema = mongoose.Schema

// schema for a writeup
const postSchema = new Schema({
    username: { type: String, required: true },
    authorID: { type: String, required: true },
    title: { type: String, required: true },
    content: {type: String, required: true }
}, {
    timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post