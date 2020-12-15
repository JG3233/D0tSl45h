
const router = require('express').Router()
const bcrypt = require('bcrypt')
var jwt = require("jsonwebtoken");
const sanitize = require('mongo-sanitize');

let User = require('../models/user.model')
require('dotenv').config()

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

router.route('/register').post((req, res) => {
    User.find()
        .then(users => {
            let exists = users.find(user => user.username == sanitize(req.body.username))
            if (exists) {
                console.log(exists)
                res.json({ msg: "Username is already taken" })
            }
        })
        .catch(err => res.status(400).json('Error: ' + err))

    const username = sanitize(req.body.username)
    const plaintextpassword = sanitize(req.body.password)
    const password = bcrypt.hashSync(plaintextpassword, 10)

    const newUser = new User({ username, password })

    newUser.save()
        .then(() => res.json({ msg: 'User added!' }))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/logout').delete((req, res) => {
    console.log('logged out')
});

module.exports = router