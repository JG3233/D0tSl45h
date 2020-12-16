// CTF site server for Jacob Gilhaus
// Server setup basics from freecodecamp

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

//express setup
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.options('*', cors())
app.use(express.json())

const uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

//connect to db
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB connection established!')
})

//setup routes
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const signinRouter = require('./routes/signin')
const blogRouter = require('./routes/blog')

app.use('/signin', signinRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/blog', blogRouter)

// run server on port
app.listen(port, () => {
    console.log(`Server running on: ${port}`)
})