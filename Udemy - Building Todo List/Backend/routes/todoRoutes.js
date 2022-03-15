const { getTasks, postTask, patchTask, deleteTask } = require('../controllers/taskController');

const router = require('express').Router();

router.route('/')
    .get(getTasks)
    .post(postTask);

router.route('/:taskId')
    .patch(patchTask)
    .delete(deleteTask);

module.exports = router;