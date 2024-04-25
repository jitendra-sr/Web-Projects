const express=require('express');
const router=express.Router();
const {getAllTasks,getTask,createTask,updateTask,deleteTask,editTask}=require('../controllers/tasks');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
router.route('/:id').put(editTask);
// put is for complete updation (or replacement) while patch is for minor changes
// In general we can use put as patch with some minor changes but patch is preferred

module.exports=router;