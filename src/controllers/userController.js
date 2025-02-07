const userModel = require("../models/userModel");

exports.cadUser = (req,res) =>
{
    res.render('index');
    return;
}

exports.receiveUser = (req,res) => {
    res.render('index');
    console.log('recebendo user');
    return;
}