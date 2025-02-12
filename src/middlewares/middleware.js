exports.chechCsfrError = (err, req, res, next) =>{
    if(err)
        res.render('error');
    next();
}

exports.localVariables = (req, res,next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.newCsrftoken = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    
    next();
}