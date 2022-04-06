// importing needed packages and models to run file
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Channel, Comment } = require('../models');

// route to render the homepage view .this is view for all visitors to site loggedIn or NOT
// this will show the channels /can be changed to show something else 
// not sure exactly what we want here 
router.get('/', (req, res) => {
// check if the user is logged in then render the homepage 
    // idk what to put here i was going to put channel but theres no channel_name, 
    // this needs to be determined 

    res.render('homepage',{loggedIn: req.session.loggedIn});

});

// find one post , when user clicks on a single post *
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_body',
            'created_at'

        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id',
                    'post_id'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']

            }]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: "no post found with this id" });
                return;
            }
            // serialzie the post data 
            const post = postData.get({ plain: true });

            // pass data to template 
            res.render('single-post', {
                post
                // loggedIn:req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for when user clicks on a category name from hompeage aka landing page 
router.get('/post/category/:category_name', (req, res) => {
    console.log('category_name: ', typeof req.params.category_name, req.params.category_name)
    Post.findAll({


        where: {
            category_name: req.params.category_name
        },
        attributes: [
            'id',
            'title',
            'post_body',
            'category_name',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id',
                    'post_id',
                    'created_at'
                ],
                include: {
                    // username of commenter
                    model: User,
                    attributes: ['username']
                }
            },
            {
                // owner of post
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: "no post found with this id" });
                return;
            }
            // serialzie the post data 
            const posts = postData.map(post => post.get({ plain: true }));

            // pass data to template 
            res.render('posts-by-category', {
                posts,
                category_name: posts[0].category_name,
                loggedIn:req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// route to display all posts by user when using search friends button 
router.get('/post/user/page/:username', (req, res) => {
    let user;
    User.findOne({
        where: {
            username: req.params.username
        },
        attributes: ['username', 'id'],
        includes: [
            {
                model: Post,
                attributes: ['id',
                    'title',
                    'post_body',
                    'category_name',
                    'created_at'
                ]

            }
        ]

    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "no post found with this id" });
                return;
            }
            // serialzie the post data 

            user = userData.get({ plain: true });
            console.log("this is userdata:", user);
            Post.findAll({
                where: {
                    user_id: user.id
                },
                includes: [{
                    model: User,

                }]
            })
                .then(postData => {
                    if (!postData) {
                        res.status(404).json({ message: 'this friend hasnt posted anything yet!' });
                        return;
                    }
                    const posts = postData.map(post => post.get({ plain: true }));
                    console.log("this is post", posts)
                    res.render('posts-by-user', {
                        user,
                        posts,
                        loggedIn:req.session.loggedIn
                    })
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});



// login route to renderlogin.handlebars/using modal now
// router.get('/login', (req,res) => {
//     // check for login and return to homepage if logged in
//     if(req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }

//     res.render('login');
// });

// signup route commented out bc not rendering page anymore /using modal 
// router.get('/signup', (req, res) => {
//     res.render('signup');
//   });

module.exports = router;