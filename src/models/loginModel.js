const mongoose = require('mongoose');
const validator = require('validator');
const loginSchema = new mongoose.Schema({
    
    email:{ type: String, required:true},
    password: {type: String, required: true}
});

const loginModel = mongoose.model('login',loginSchema);

class login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async registerUser(){
        try{
            this.validateBody();
            if(this.errors.length >0) return;
            
            this.user = await loginModel.create(this.body);
        }
        catch(error){
            return error
        }
    }
        

    validateBody(){
        this.body = {
            email: this.body.email,
            password: this.body.password
        };

        if(!validator.isEmail(this.body.email))
            this.errors.push('Email inválido!');
        if(body.password.length < 3 || body.password.length >= 50)
            this.errors.push('Senha precisa estar entre 3 e 50 caracteres!')
    }
}

module.exports = login;