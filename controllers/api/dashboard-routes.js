const router = require('express').Router();
const { Post, Comment } = require('../../models');

//create a new post

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        console.log(postData)
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
})

//edit a post

router.put('/edit-post/:id', async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content,
        },
            {
                where: {
                    id: req.params.id,
                }
            })
        res.json(postData)
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete a post

router.delete('/delete/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id }
        });
        res.json(postData);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

// add comments to a post

router.post('/comment', async (req, res) => {
    console.log(req.body)
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
})



module.exports = router;