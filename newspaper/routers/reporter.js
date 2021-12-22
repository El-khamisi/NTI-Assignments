const express = require('express');
const router = express();
const multer = require('multer');
const auth = require('../middelware/auth');
const controllers = require('../controllers/newspaper');



router.get('/', ()=>{
    console.log('HEllo server')
});


router.post('/signup', controllers.signup);

router.post('/login', controllers.login);

router.get('/allReporters', controllers.getAllReporter);

router.delete('/users/:id', auth, controllers.deleteReporter);

router.delete('/logout', auth, async(req,res)=>{
    try{
        req.reporter.tokens = req.reporter.tokens.filter((el)=>{return el !== req.token});

        await req.reporter.save();
        res.status(200).send('Logout Successfully');
    }catch(error){
        res.send(500).send(error.message);
    }
})


router.delete('/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('Logout all success')
    }
    catch(e){
        res.status(500).send(e.message)
    }
})


router.patch('/rep/:id', auth, controllers.editReporter)

const uploads = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
            cb(new Error('Please upload image'))
        }
        cb(null,true)
    }
})

router.post('/rep/thumb', auth, uploads.single('thumbnails'), controllers.photo);

module.exports = router;