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

exports.loginRequired = (req, res, next) =>{
    if(!req.session.user){
        req.flash("errors", "Você precisa fazer login!");
        req.session.save(function(){
            res.redirect('/');
        });
        return;
    }
    next();
}

exports.newCsrftoken = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    
    next();
}