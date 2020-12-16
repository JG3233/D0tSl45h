const router = require('express').Router()
const sanitize = require('mongo-sanitize')
const { authJWT } = require('../middleware')
let User = require('../models/user.model')

//return all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

//return specific user
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update user data for profile
router.route('/update/:id').post(authJWT.verifyToken, (req, res) => {
    User.findById(req.params.id)
        .then(user => {

            user.bio = sanitize(req.body.bio)
            user.linkedin = sanitize(req.body.linkedin)
            user.github = sanitize(req.body.github)

            user.save()
                .then(() => res.json('Profile updated!'))
                .catch(err => res.status(400).json('Error 1: ' + err));
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

module.exports = router