const router = require('express').Router()
const { authJWT } = require('../middleware')
let Post = require('../models/post.model')

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add', authJWT.verifyToken).post(authJWT.verifyToken, (req, res) => {
    const username = req.body.username
    const title = req.body.title
    const content = req.body.content

    const newPost = new Post({ username, title, content })

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(authJWT.verifyToken, (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(authJWT.verifyToken, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.username = req.body.username;
            post.title = req.body.title;
            post.content = req.body.content;

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router