// required models for associations
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Friend = require('./Friend');



// 1-to-1 relations 



Post.belongsTo(User, {
    foreignKey: 'user_id',
    constraints:false
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    constraints:false
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    constraints:false
});
// Friend.belongsTo(User, {
//     foreign_key:'user_id', 
//     constraints:false
// });


// 1-to-Many relations 
User.hasMany(Friend, {
    foreignKey:'user_id',
    constraints:false
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
    constraints:false
});

User.hasMany(Post, {
    foreignkey:'user_id',
    constraints:false
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    constraints:false
});



module.exports = {
    User, 
    Post, 
    Comment, 
    Friend
};