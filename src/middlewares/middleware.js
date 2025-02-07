exports.chechCsfrError = (err, req, res, next) =>{
    if(err && err.code === 'EBADCSFRTOKEN'){
        return res.render('error');
    }
}

exports.newCsrftoken = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    return next();
}