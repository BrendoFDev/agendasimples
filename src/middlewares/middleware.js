exports.chechCsfrError = (err, req, res, next) =>{
    if(err)
        res.render('error');
    return next();
}

exports.newCsrftoken = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    return next();
}