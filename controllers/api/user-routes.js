const router = require("express").Router();
const { User, Post, Comment } = require('../../models');

// GET all Users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET 1 user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        // commented out password, until test password encryption
        /*(attributes: { exclude: ['password']},*/
        include: [
            {
                model: Post,
                attributes: ['id', 'title', /*'preview',*/ 'post_body', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title', 'id']
                }
            }
        ]
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id number' });
                return;
            }
            // res.json(userData)

             // serialzie the post data 
             const user = userData.get({ plain: true });
             // pass data to template 
             res.render('single-post', {
                user
                // loggedIn:req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});


// POST create new User 
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(userData => {
            // save user data to session to give server access to user_id, username, and logged in status as boolean
            req.session.save(() => {
                req.session.user_id = userData.id,
                    req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData)
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// PUT update username or email 
router.put('/:id', (req, res) => {
    User.update(
        {
            username: req.body.username,
            email: req.body.email
        },
        {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        }
    )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE user from database 
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// USER login route 
router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'No user associated with that email address' });
                return;
            }
            
            // NOTE: the password is triggering this block of code
            // ****
            console.log(req.body.password);
            console.log(userData.dataValues);
            const userPassword = userData.dataValues.password

            // const checkPass = userData.validatePassword(req.body.password);
             const checkPass = userPassword === req.body.password;
            console.log(checkPass)
            if (!checkPass) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id,
                    req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: `You are now logged in as ${userData.username}` })
            })
        })
});

// USER logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });

        res.json({ message: 'You are now logged out' });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;