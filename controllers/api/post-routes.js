const router = require("express").Router();
const { User, Post, Comment } = require('../../models');
const upload = require('./image-engine');
const withAuth = require('../../public/javascript/utils/auth');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_body',
            'category_name',
            'created_at',
            'image_path'
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
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// GET one post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_body',
            'category_name',
            'created_at',
            'image_path'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: [['username', 'post_owner']]
            }
        ]
    })
    .then(postData => {
        if(!postData){
            res.status(404).json({ message: 'No post found by this id' });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET all POSTS by category_name 
router.get('/category/:category_name', (req, res) => {
    Post.findAll({
        where: {
            category_name: req.params.category_name
        },
        attributes: [
            'id',
            'title',
            'post_body',
            'category_name',
            'user_id',
            'image_path'
        ],
        include: [
            {
                model: User,
                attributes: [
                    'id',
                    ['username', 'post_owner']
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            ['username', 'comment_owner'] 
                        ]
                    }
                ]
            }
        ]
    })
    .then(postData => {
        if(!postData) { 
            res.status(404).json({ message: 'No posts found with that category name'});
            return;
        }
        
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);    
    });
});

// POST new POST w/ IMAGE optional; 
router.post('/',  withAuth, upload.single('post_image'), (req, res) => {
    console.log("THIS IS IT!!!", req.body.image_path)
    // if (req.file) {
         Post.create({
            title: req.body.title,
            post_body: req.body.post_body,
            category_name: req.body.category_name,
            user_id: req.session.user_id,
            image_path: req.body.image_path
         })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    // //   }  
    //   else {
    //     Post.create({
    //         title: req.body.title,
    //         post_body: req.body.post_body,
    //         category_name: req.body.category_name,
    //         user_id: req.session.user_id,
    //     })
    //     .then(postData => res.json(postData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     })
    //   }
});

// PUT update a post title, post_body, or category_name 
router.put('/:id', withAuth,(req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_body: req.body.post_body,
            category_name: req.body.category_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if(!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Delete a post 
router.delete('/:id',withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No Post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; 