// CTF site server for Jacob Gilhaus
// Server setup basics from freecodecamp

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

app.use(cors())
app.use(express.json())

const uri = process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB connection established!')
})

const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const signinRouter = require('./routes/signin')

app.use('/signin', signinRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Server running on: ${port}`)
})