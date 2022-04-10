const router = require("express").Router();
const { User, Post, Comment } = require('../../models');
const upload = require('./image-engine');
const withAuth = require('../../public/javascript/utils/auth');


// GET all Users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', /*'preview',*/ 'post_body', 'created_at', 'user_image_path']
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
                attributes: ['id', 'title', /*'preview',*/ 'post_body', 'created_at', 'user_image_path']
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
            res.json(userData)
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
        password: req.body.password,
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
router.put('/:id', withAuth, upload.single('image'), (req, res) => {
    console.log(req.file)
    const imgPath = req.file.path.split('\\');
    const newImgPath = "/" + imgPath[imgPath.length - 2] + "/" + imgPath[imgPath.length - 1];
    console.log('++++++++++++++++++++++==========================', req.file.path);
    console.log(newImgPath);
    User.update(
        {
            username: req.body.username,
            email:req.body.email,
            user_image_path: newImgPath,
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
            // NOTE why does the user data have an array of length 2
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
        if(!userData) {
            res.status(400).json({ message: 'No user associated with that email address' });
            return;
        }
// NOTE: the password is triggering this block of code
// ****
        const checkPass = userData.validatePassword(req.body.password);
        console.log(checkPass);
        if (!checkPass) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: `You are now logged in as ${userData.username}` })
            console.log(req.session)
        });
        
    });
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