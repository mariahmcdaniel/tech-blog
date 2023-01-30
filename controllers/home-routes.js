const router = require('express').Router();
const {Post, User, Comment} = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }]
    });
    const posts = postData.map((post) =>
    post.get({ plain: true }));
    res.render('homepage', { posts });
    // res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return; 
  }
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId
      },
      include: {model: User}
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts });
    // res.json(postData);
  } catch (err) {
  res.status(500).json(err);
}
});

router.get('/dashboard/edit/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return; 
  }
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: User}]
    })
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('editpost', { posts })
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/viewpost/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  try{
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: User, 
      }],
      include: [ {
         model: Comment,
         where: {
           post_id: req.params.id 
          },
          include: [{ model: User }]
         }],
    });
    const post = postData.get({ plain: true });
    res.render('viewpost', { post });
    // res.json(postData);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

module.exports = router;
