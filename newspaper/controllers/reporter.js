const news = require('../models/news');
const reporter = require('../models/reporter');
const bcrypt = require('bcryptjs');

exports.signup = async(req, res, next)=>{
    try{
        
        const newReporter = new reporter(req.body);
        
        const nToken = await newReporter.generateToken();
        await newReporter.save();

        res.status(200).send({newReporter, nToken});
    }catch(e){
        res.status(400).send(e.message);
    }
}


exports.login = async(req, res, next)=>{
    try{
        const findReporter = await reporter.findReporter(req.body.email);
        
        const matchPass = await bcrypt.compare(req.body.password, findReporter.password);
        
        if(!matchPass){
            throw new Error(`The password you've entered is incorrect..`);
        
        }
        const nToken = await findReporter.generateToken();
        res.status(200).send({findReporter, nToken});

    }catch(error){
        res.status(500).send(error.message);
    }
}

exports.editReporter = async(req,res, next)=>{

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','age', 'phone', 'password'];


    const isValid = updates.every((e)=> allowedUpdates.includes(e));
    
    if(!isValid){
       return res.status(400).send("Can't update")
    }

    
    try{
        const _id = req.params.id
       const nrep = await report.findById(_id);

        if(!user){
            return res.status(404).send(`There's No user with this ID: ${_id}`)
        }
       
        updates.forEach((el)=>(nrep[el]= req.body[el]))
        await nrep.save();
        res.status(200).send(nrep);
    }
    catch(error){
        res.status(500).send(error.message);
        
    }
    
}

exports.deleteReporter = async(req,res, next)=>{
    try{
        const _id = req.params.id;
        const dRep = await reporter.findByIdAndDelete(_id);
         
        if(!dRep){
            return res.status(404).send('No Reporter is found');
        }
        res.status(200).send(dRep);
    }
    catch(error){
        res.status(500).send(dRep);
    }
   
    
}



exports.photo = async(req,res, next)=>{
    try{
        req.reporter.thumbnails = req.file.buffer;
        await req.reporter.save();
        res.status(200).send();
    }
    catch(e){
        res.status(400).send(e.message)
    }
}






exports.getAllNews = (req, res, next)=>{
    const allNews = reporter.find({}).populate('news');

    res.send(allNews);
}



exports.getAllReporter = (req, res, next)=>{
    reporter.find({}).then((data)=>{
        res.status(200).send(data);

    }).catch((e)=>{
        res.status(500).send(e);

    })
}