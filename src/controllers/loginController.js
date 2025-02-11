const Login = require('../models/loginModel');

exports.index = (req,res) => {
    res.render('login');
}

exports.registerUser = async (req,res) =>{
    const login = new Login(req.body);
    await login.registerUser();

    if(login.errors.length > 0 ){
        req.flash('erros',login.errors);
        
        req.session.save(function (){
            return res.redirect('back');
        });

        return;
    }
    console.log(login.body);
}

exports.userLogin = (req, res) => {

}

