const { render } = require('ejs');
const Login = require('../models/loginModel');

exports.index = (req,res) => {
    res.render('login');
}

exports.registerUser = async (req,res) =>{
    try{
        const login = new Login(req.body);
        await login.registerUser();
    
        if(login.errors.length > 0 ){
            req.flash('errors',login.errors);
            
            req.session.save(function (){
                return res.redirect('./');
            });
    
            return;
        }

        req.flash('success', "Usuário criado com sucesso!");
        
        req.session.save(function (){
            return res.redirect('./');
        });

        return;
    }
    catch(error){
        console.log(error);
        res.render('error');
    }
}

exports.userLogin = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.userLogin();
    
        if(login.errors.length > 0 ){
            req.flash('errors',login.errors);
            
            req.session.save(function (){
                return res.redirect('./');
            });
    
            return;
        }

        req.session.user = login.user;
        req.session.save(function (){
            return res.redirect('../');
        });

        return;
    }
    catch(error){
        console.log(error);
        res.render('error');
    }
}

exports.logout =  (req,res) => {
    try{
        
        req.session.destroy((err) => {
            if (err) {
                console.error("Erro ao destruir a sessão:", err);
                return res.render('error');
            }

            return res.redirect('../login');
           
        });

    }catch(error){
        res.render('error');
    }
}

