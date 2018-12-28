'use strict'
var express = require('express');
var taskController = require('../controllers/TaskController');
var userController = require('../controllers/UserController');
var router = express.Router(); //enrutador

router.post('/AddTask',taskController.AddTask);
router.post('/getTasks',taskController.getTasks);
router.post('/getTask',taskController.getTask);
// router.post('/pushTask/:id',taskController.pushTask);
router.post('/editTask',taskController.editTask);
router.post('/removeTask',taskController.removeTask);

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/testUsername',userController.testUsername);
module.exports = router;