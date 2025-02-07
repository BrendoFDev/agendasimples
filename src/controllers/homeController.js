const homeModel = require('../models/homeModel')

homeModel.create({
    titulo:'titulo de teste',
    descricao: 'uma descrição de teste'
})
.then(data => console.log(data))
.catch(e => console.log(e));