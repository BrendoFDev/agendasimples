const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    email:{ type: String, required:true, unique:true},
    password: {type: String, required: true}
});

const loginModel = mongoose.model('login', loginSchema);

class login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async registerUser(){
       
        await this.processData();
        if(this.errors.length > 0) return;

        this.user = await loginModel.create(this.body);

    }

    async processData(){
        if(!validator.isEmail(this.body.email))
            this.errors.push('Email inválido!');
        if(this.body.password.length < 3 || this.body.password.length >= 50)
            this.errors.push('Senha precisa estar entre 3 e 50 caracteres!')
        if(await this.userExists())
            this.errors.push(`Usuário com email ${this.body.email} já está cadastrado!`)

        this.body = {
            email: this.body.email,
            password: this.hashPassword(),
        };
    }
           
    async userExists(){
        this.user = await loginModel.findOne({
            email: this.body.email
        });
        
        return this.user;
    }

    hashPassword(){
        const salt = bcryptjs.genSaltSync();
        return bcryptjs.hashSync(this.body.password, salt);
    }


    async userLogin(){
        await this.processLoginData();
        if(this.errors.length > 0)
            return;
        
    }

    async processLoginData(){
        try{
            await this.userExists();

            if(!this.user)
                this.errors.push("Email não cadastrado!");
            
            if(!this.verifyPassword(this.user.password)){
                this.errors.push("Senha incorreta!");
                this.user = null;
            }
        }
        catch(error){
            console.log(error);
            throw new Error(`Erro ocorreu ao tentar logar: ${error}`)
        }
    }

    verifyPassword(hashedPassword){
        return bcryptjs.compareSync(this.body.password, hashedPassword)
    }
 
}

module.exports = login;