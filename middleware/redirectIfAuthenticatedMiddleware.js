module.exports = (req, res, next) => {
    if (req.session.userId) {
	return res.redirect('/'); //if the user is logged in, go to the home page
    }

    next();
}
