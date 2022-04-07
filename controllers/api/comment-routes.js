const router = require("express").Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../public/javascript/utils/auth');

// GET all comments 
router.get('/',(req, res) => {
    Comment.findAll({
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
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET 1 post by id 
// changed findAll to findOne 
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id'
        ],
        include:[ 
            {
                model: User, 
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['post_body'],
                include: {
                    model: User,
                    attributes: [['username', 'post_owner']]
                }
            }
        ]
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// we were working w/ Jaydon here vvvvvvvvvv

// POST create a Comment
router.post('/:id', withAuth, (req, res) => {
    console.log("IN HERERERERERE!!!!!!!!!!!!!!!!!")
    Comment.create(     
        {
    // uncomment if statment and req.session.user_id [delete 'req.body.user_id'] once we are working it into the front end 
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.params.id,
            
        })
        .then(commentData => {
            
           res.json(commentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// PUT update comment text 
router.put('/:id', withAuth,(req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }   
        }
    )
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Delete a comment 
router.delete('/:id', withAuth,(req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;