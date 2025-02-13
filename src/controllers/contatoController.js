const Contato = require('../models/contatoModel');

exports.index = (req,res) =>{
    res.render('contato',{
        contato:{}
    });
}

exports.registerContato = async (req, res) =>{
    try{
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0 ){
            req.flash('errors', contato.errors);

            req.session.save(function (){
                return res.redirect('./');
            });

            return;
        }

        req.flash('success', "Contato salvo com sucesso!");
        
        req.session.save(function (){
            return res.redirect(`/contato/${contato.contato._id}`);
        });

        return;

    }
    catch(error){
        console.log(error);
        res.render('error')
    }
}

exports.edit = async (req, res) =>{
    try{
        if(!req.params.id) return res.render('error');

        const currentContato = await Contato.findContato(req.params.id);
        if(!currentContato) return res.render('error');
        
        res.render('contato', {
            contato: currentContato
        });
    }
    catch(error){
        console.log(error);
        throw new Error(error);
    }
}

exports.update = async (req, res) =>{
    try{
        const contato = new Contato(req.body)
        await contato.updateContato(req.params.id)
    
        if(contato.errors.length > 0 ){
            req.flash('errors', contato.errors);
    
            req.session.save(function (){
                return res.redirect('./');
            });
    
            return;
        }
    
        req.flash('success', "Contato atualizado com sucesso!");
        
        req.session.save(function (){
            return res.redirect(`/contato/${contato.contato._id}`);
        });
    
        return;

    }catch(error){
        throw new Error(error)
    }
}

exports.delete = async (req, res)=>{
    try{
        
        await Contato.deleteContato(req.params.id);
        
        req.flash('success', "Contato deletado com sucesso!");
        
        req.session.save(function (){
            return res.redirect('../../');
        });
    
        return;

    }catch(error){
        throw new Error(error)
    }
}