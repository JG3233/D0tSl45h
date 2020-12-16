const router = require('express').Router()
const sanitize = require('mongo-sanitize')
const { authJWT } = require('../middleware')
let Post = require('../models/post.model')

router.route('/').get((req, res) => {
    Post.find()
        .sort({ 'updatedAt': 'desc' })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add', authJWT.verifyToken).post(authJWT.verifyToken, (req, res) => {
    const username = sanitize(req.body.username)
    const authorID = sanitize(req.body.authorID)
    const title = sanitize(req.body.title)
    const content = sanitize(req.body.content)

    const newPost = new Post({ username, authorID, title, content })

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
            post.username = sanitize(req.body.username)
            post.title = sanitize(req.body.title)
            post.content = sanitize(req.body.content)

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router