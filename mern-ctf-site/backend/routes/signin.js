const router = require('express').Router()
const bcrypt = require('bcrypt');
const e = require('express');
var jwt = require("jsonwebtoken");
const sanitize = require('mongo-sanitize');

let User = require('../models/user.model')
require('dotenv').config()

// user tries to login, verify and return accordingly
router.route('/').post((req, res) => {
    User.find()
        .then(users => {
            let exists = users.find(user => user.username == sanitize(req.body.username))
            if (exists) {
                bcrypt.compare(sanitize(req.body.password), exists.password)
                    .then(result => {
                        if (result) {
                            let token = jwt.sign({ id: exists.id }, process.env.SECRET, {
                                expiresIn: 86400 // 24 hours
                            });

                            res.json({
                                msg: "login successful",
                                accessToken: token,
                                id: exists._id,
                                username: exists.username
                            });
                        }
                        else {
                            res.json({ msg: "password incorrect" })
                        }
                    })
            }
            else {
                res.json({ msg: "user does not exist" })
            }
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

// user is registering
router.route('/register').post((req, res) => {
    User.find()
        .then(users => {
            let exists = users.find(user => user.username == sanitize(req.body.username))
            if (exists) {
                res.json({ msg: "Username is already taken" })
            }
            else {
                //sanitize and include profile values as empty
                const username = sanitize(req.body.username)
                const plaintextpassword = sanitize(req.body.password)
                const password = bcrypt.hashSync(plaintextpassword, 10)
                const bio = ''
                const linkedin = ''
                const github = ''

                const newUser = new User({ username, password, bio, linkedin, github })

                newUser.save()
                    .then(() => res.json({ msg: 'User added!' }))
                    .catch(err => res.status(400).json('Error: ' + err))
            }
        })
        .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router