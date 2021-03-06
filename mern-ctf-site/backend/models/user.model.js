const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

//schema for a user account
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    bio: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    github: {
        type: String,
    }

}, {
    timestamps: true,
})

//implement some password security functions so that they are hashed
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.comparesync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User