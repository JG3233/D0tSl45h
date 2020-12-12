const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').post((req, res) => {
    User.find()
        .then(users => {
            let exists = users.find(user => user.username == req.body.username)
            if(exists){
                if(exists.password == req.body.password){
                    res.json("login successful")
                }
                else{
                    res.status(401).json('password incorrect')
                }
            }
            else{
                res.status(401).json('user does not exist')
            }
        })
        .catch(err => res.status(400).json('Error: ' + err))
})




module.exports = router