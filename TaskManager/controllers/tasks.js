const Task=require('../models/Task');
const asyncWrapper=require('../middlewares/asyncWrapper');
const {createCustomError}=require('../errors/custom-error');
// const getAllTasks = async (req, res)=>{
//     try {
//         const tasks=await Task.find({});
//         res.send(tasks);
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// } 

// Note: We are using a middleware to avoid using tryCatch for every controller. Now the below code in controllers are only those part which we will write in try block if not using error handler middleware
const getAllTasks =asyncWrapper(async (req,res)=>{
    const tasks=await Task.find({});
    res.send(tasks);
})
// const getTask = asyncWrapper(async (req,res)=>{
//     // res.send('get single task');
//     // res.json({id:req.params.id}); 
//     const {id:taskID} = req.params;
//     const task=await Task.findOne({_id:taskID});
//     if(!task) return res.status(404).json({msg:`No task with id : ${taskID}`})
//     res.status(200).json({task});
// })

// Handling every type of error by passing error in next
const getTask = asyncWrapper(async (req,res,next)=>{
    // res.send('get single task');
    // res.json({id:req.params.id}); 
    const {id:taskID} = req.params;
    const task=await Task.findOne({_id:taskID});
    if(!task){
        // return res.status(404).json({msg:`No task with id : ${taskID}`})

        // const error=new Error(`No task with id : ${taskID}`);
        // error.status=404;
        // return next(error);

        // We have extended Error class so that we don't have to create custom error evrytime
        return next(createCustomError(`No task with id : ${taskID}`,404));
    }
    res.status(200).json({task});
})
const createTask = asyncWrapper(async (req,res)=>{
    // res.send('create task');
    // res.json(req.body); //sending json data using express.json() middleware in app.js
    const task=await Task.create(req.body);
    res.status(201).json({task});
})
const deleteTask = asyncWrapper(async (req,res)=>{
    // res.send('delete the task');
    const task=await Task.findOneAndDelete({_id:req.params.id});
    if(!task) return res.status(404).json({msg:`No task with id : ${taskID}`})
    res.status(200).json({task:null,status:'success'});
})
const updateTask = asyncWrapper(async (req,res)=>{
    // res.send('update the task');
    const {id:taskID}=req.params;
    // const task=await Task.findOneAndUpdate({_id:taskID},req.body); // due to Default options of update, we will still got the older data after updation and validators will be not effective.
    const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true,
        runValidators:true
    });
    if(!task) return res.status(404).json({msg:`No task with id : ${taskID}`})
    res.status(200).json({task});
})
// put method replace the whole document with req.body but mongoose will update only those properties which are passed in req.body. For complete replacement we have to add flag overwrite but default properties will still remain in document
const editTask = async (req,res)=>{
    try {
        const {id:taskID}=req.params;
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
            overwrite:true
        });
        if(!task) return res.status(404).json({msg:`No task with id : ${taskID}`})
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    editTask
};
