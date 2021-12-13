const express = require('express');
const router = express();

const controller = require('../controllers/task');





router.post('/', controller.postTask);
router.get('/findAll', controller.getAllTasks);
router.get('/find/:_id', controller.getTask);
router.patch('/:_id', controller.editTask);
router.delete('/:_id', controller.deleteTask);




module.exports = router;