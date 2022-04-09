const withAuth = (req, res, next) => {
    if(!req.session.user_id) {
        res.reload();
    }
    else {
        next();
    }
};

module.exports = withAuth;