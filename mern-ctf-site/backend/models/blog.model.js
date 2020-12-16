const mongoose = require('mongoose')

const Schema = mongoose.Schema

// schema for a blog post
const blogSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: {type: String, required: true }
}, {
    timestamps: true,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog