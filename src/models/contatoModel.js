const mongoose = require('mongoose');
const validator = require('validator');

const contatoSchema = new mongoose.Schema({
    nome:{ type: String, required:true},
    sobrenome: {type:String, required:false, default:''},
    email: {type:String, required:false, default:''},
    telefone: {type:String, required:false, default:''},
    criadoEm: {type:Date, default:Date.now},
});

const contatoModel = mongoose.model('contato',contatoSchema);


function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function(){
    this.valida();
    if(this.errors.length > 0 ) return;

    this.contato = await contatoModel.create(this.body);
};

Contato.prototype.valida = async function(){

    if(!this.body.nome)
        this.errors.push("Nome é um campo obrigatório!");
    if(!this.body.email && !this.body.telefone)
        this.errors.push("Pelo menos um contato precisa ser enviado: e-mail ou telefone");
    if(this.body.email && !validator.isEmail(this.body.email))
        this.errors.push('Email inválido!');
   
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };
}

Contato.findContato = async function (id){
    const contato = await contatoModel.findById(id);
    return contato;
}

Contato.getContatos = async function(){
    const contatos = await contatoModel.find().sort({criadoEm: -1 })
    return contatos;
}

Contato.deleteContato = async function(id){
   this.contato = await contatoModel.findByIdAndDelete(id);
}

Contato.prototype.updateContato = async function(id){
    
    this.valida();
    if(this.errors.length > 0) return;

    this.contato = await contatoModel.findByIdAndUpdate(id, this.body, {new:true});
}

module.exports = Contato;