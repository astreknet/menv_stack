module.exports = (req, res) =>{
	res.render('register', {
        errors: req.flash('validationErrors')
        //errors: req.session.validationErrors
    }) // render register.ejs
}
