const router = require('express').Router()
const sanitize = require('mongo-sanitize')
const { authJWT } = require('../middleware')
let Blog = require('../models/blog.model')

// blog route gets all blogs
router.route('/').get((req, res) => {
    Blog.find()
        .sort({ 'updatedAt': 'desc' })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

//route to add a blog, uses verification middleware
router.route('/add', authJWT.verifyToken).post(authJWT.verifyToken, (req, res) => {
    const username =sanitize(req.body.username)
    const title = sanitize(req.body.title)
    const content = sanitize(req.body.content)

    const newBlog = new Blog({ username, title, content })

    newBlog.save()
        .then(() => res.json('Blog added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// returns specific blog post
router.route('/:id').get((req, res) => {
    Blog.findById(req.params.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json('Error: ' + err));
});

// deletes a blog post, auth check
router.route('/:id').delete(authJWT.verifyToken, (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => res.json('Blog deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// edit to a blog post, auth check
router.route('/update/:id').post(authJWT.verifyToken, (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            blog.username = sanitize(req.body.username)
            blog.title = sanitize(req.body.title)
            blog.content = sanitize(req.body.content)

            blog.save()
                .then(() => res.json('Blog updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router