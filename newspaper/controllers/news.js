const express = require('express');
const router = express();
const multer = require('multer');
const news = require('../models/news');
const reporter = require('../models/reporter');



exports.getNews = async(req,res)=>{
    try{
        const _id = req.params.id;
        const fNews = await news.findOne({_id,byReporter:req.reporter._id});
        if(!fNews){
            return res.status(404).send('Not found')
        }
        res.status(200).send(fNews);
    }
    catch(e){
        res.status(500).send(e.message)
    }
}



exports.postNews = async(req,res)=>{
    try{
        
        const nNews = new news({...req.body,byReporter:req.reporter._id})
        await nNews.save()
        res.status(201).send(nNews)
    }
    catch(e){
        res.status(400).send(e.message)
    }
}


exports.getAllNews = async(req,res)=>{
    try{
        
       const byNews = await news.find({byReporter: req.reporter._id}).populate('byReporter');
       res.status(200).send(byNews)
    }
    catch(e){
        res.status(500).send(e.message)
    }
}


exports.patchNews = async(req,res)=>{
    
    try{
        const updates = Object.keys(req.body);
        const allowedupdates = ['title', 'description'];

        const isValid = updates.every((e)=> allowedupdates.includes(e));

        if(!isValid){
            return res.status(400).send("Can't update title")
        }
        const _id = req.params.id
       
        const fNews = await news.findOne({_id, byReporter:req.reporter._id});

        if(!fNews){
            
            return res.status(404).send("News is Not found")
        }
        updates.forEach((e)=> fNews[e]= req.body[e])
        
       await fNews.save()
        res.status(200).send(fNews)

    }
    catch(e){
        res.status(400).send(e.message)
    }
}

exports.deleteNews = async(req,res)=>{
    try{
        const _id = req.params.id
        const fNews = await news.findOneAndDelete({_id,byReporter:req.reporter._id});

        if(!fNews){
            return res.status(404).send('Not found')
        }
        res.status(200).send(fNews)
    }
    catch(e){
        res.status(500).send(e.message)
    }
    
}

