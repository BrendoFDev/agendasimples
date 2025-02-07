const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome:{type:String, requires:true},
    idade: Number,
    cpf: String
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;