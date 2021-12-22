const mongoose = require('mongoose');


const taskModel = require('../models/task');






exports.postTask = (req, res, next) => {

    const entity = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    };


    // const newTask = new taskModel(entity);
    const newTask = new taskModel({...req.body, onwer:req.user._id});

    newTask.save()
        .then((data) => 
            res.status(201).send(entity)
        )
        .catch(() => 
            res.status(400).send(`There is an error with ${entity.title}`)
        );

    
}


exports.getAllTasks = async(req, res, next) => {
    taskModel.find({})
        .then((data)=>{
            res.json(data)
        })
        .catch((e)=>{
            res.json(e)
        });
    
}

exports.getTask = (req, res, next) => {

    taskModel.findById(req.params._id)
        .then((data)=>
            res.json(data)    
        )
        .catch((e)=>
            res.status(500).send(e)
        )
}

exports.editTask = (req, res, next) => {
    
    const allow = ['description', 'completed'];
    const fields = Object.keys(req.body);

    const valid = fields.every((element)=> allow.includes(element));


    if(valid){
        taskModel.findByIdAndUpdate(req.params._id, 
            req.body,
            {
                new:true,
                runValidators:true
            }).then((data)=>{
                if(data){
                    res.json(data);
                }else{
                    res.status(404).send(`The User with id: ${req.params._id} Not Found`);
                }

            }).catch((e)=>{
                res.status(500).send(e)

            });
    }else{
        const notAllow = fields.filter((element)=> !allow.includes(element));

        res.status(500).send(`you don't have permission to edit ${notAllow} fields`);
    }
   
    
}

exports.deleteTask = (req, res, next) => {
    
    taskModel.findByIdAndDelete(req.params._id).then((data)=>{
            if(data){
                res.send(`The User with id: ${req.params._id} has been deleted`);
            }else{
                res.status(404).send(`The User with id: ${req.params._id} Not Found`);
            }

        }).catch((e)=>{
            res.status(500).send(e)

        });
    
    
}