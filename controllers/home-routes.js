const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }]
    });
    const posts = postData.map((post) =>
      post.get({ plain: true }));
      // res.json(posts);
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
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
  res.render('signup');
});

router.get('/dashboard/new', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  res.render('newpost', { 
    loggedIn: req.session.loggedIn,
    username: req.session.username,
   });
});

router.get('/dashboard/:id', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
        'user_id'
      ],
      include:
      {
        model: User,
        attributes: [ 'username' ],
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      loggedIn: true,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,{
      attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
      include: [{
        model: User,
        attributes: [ 'username' ],
      }]
    });
    const post = postData.get({ plain: true });
    res.render('editpost', { 
      post, 
      loggedIn: true, 
      username: req.session.username, 
    });
    // res.json(postData);
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
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
      include: [{
        model: User,
      }],
      include: [{
        model: Comment,
        attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
        include: { 
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User, 
        attributes:  ['username'],
      },
    ],
    });
    if (!postData){
      res.status(404).json({message: 'No post found with this id'});
      return;
    }
    const post = postData.get({ plain: true });
    res.render('viewpost', { 
      post,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
     });
    // res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




module.exports = router;
