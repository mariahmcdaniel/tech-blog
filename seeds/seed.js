const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./user-seeds.json');
const postData = require('./post-seeds.json');
const commentData = require('./comment-seeds.json');


const init = async () => {
  await sequelize.sync({force: true});

  const users = await User.bulkCreate( userData, {
    individualHooks: true,
    returning: true,
  });
  const posts = await Post.bulkCreate(postData, {
    
  });
  
  const comments = await Comment.bulkCreate(commentData, {
    
  });
  process.exit(0);
};

init();