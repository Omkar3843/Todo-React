const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskcontroller');

router.get('/tasks', taskController.getTasks);
router.post('/task', taskController.createTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;
