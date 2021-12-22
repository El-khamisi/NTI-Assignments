const express = require('express');
const router = express();
const multer = require('multer');
const auth = require('../middelware/auth');
const news = require('../models/news');





// router.get('/news/:id', auth, async(req,res)=>{
//     try{
//         const _id = req.params.id;
//         const fNews = await news.findOne({_id,owner:req.reporter._id});
//         if(!fNews){
//             return res.status(404).send('Not found')
//         }
//         res.status(200).send(fNews);
//     }
//     catch(e){
//         res.status(500).send(e.message)
//     }
// })


// router.post('/news', auth, async(req,res)=>{
//     try{
    
//         const nNews = new news({...req.body,owner:req.reporter._id})
//         await nNews.save()
//         res.status(201).send(nNews)
//     }
//     catch(e){
//         res.status(400).send(e.message)
//     }
// })

// router.get('/news', auth, async(req,res)=>{
//     try{
        
//         await req.user.populate('vNews')
//         res.send(req.user.tasks)
//     }
//     catch(e){
//         res.status(500).send(e.message)
//     }
// })



// router.patch('/news/:id',auth, async(req,res)=>{
    
//     try{
//         const updates = Object.keys(req.body);
//         const allowedupdates = ['title', 'description'];

//         const isValid = updates.every((e)=> allowedupdates.includes(e));

//         if(!isValid){
//             return res.status(400).send("Can't update title")
//         }
//         const _id = req.params.id
       
//         const fNews = await news.findOne({_id,owner:req.reporter._id});

//         if(!fNews){
            
//             return res.status(404).send("News is Not found")
//         }
//         updates.forEach((e)=> task[e]= req.body[e])
        
//        await fNews.save()
//         res.status(200).send(task)

//     }
//     catch(e){
//         res.status(400).send(e.message)
//     }
    
    
// })

// router.delete('/news/:id', auth, async(req,res)=>{
//     try{
//         const _id = req.params.id
//         const fNews = await news.findOneAndDelete({_id,owner:req.reporter._id});

//         if(!fNews){
//             return res.status(404).send('Not found')
//         }
//         res.status(200).send(fNews)
//     }
//     catch(e){
//         res.status(500).send(e.message)
//     }
    
// })



module.exports = router;