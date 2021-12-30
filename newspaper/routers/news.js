const express = require('express');
const router = express();
const multer = require('multer');
const news = require('../models/news');
const reporter = require('../models/reporter');
const auth = require('../middelware/auth');
const newsCtrl = require('../controllers/news');





router.get('/news/:id', auth, newsCtrl.getNews);


router.post('/news', auth, newsCtrl.postNews);

router.get('/news', auth, newsCtrl.getAllNews);


router.patch('/news/:id',auth, newsCtrl.patchNews);

router.delete('/news/:id', auth, newsCtrl.deleteNews);



module.exports = router;