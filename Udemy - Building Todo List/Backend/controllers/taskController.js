const TaskModel = require('../models/TaskModel.js');

const getTasks = async (req, res) =>{
    let list;
    try{
    list = await TaskModel.find();
    }
    catch(err){
        // throw new Error("Couldn't Find the Todo List due to Server Problem.");
        res.status(500).json({success:false, message:"Couldn't add the Todo in List due to Server Problem."});
    }
    res.status(200).json({success:true, data:list.map(listItem =>listItem.toObject({getters:true}))})
}

const postTask = async (req, res) =>{
    const {title, description} = req.body;
    const task = TaskModel({
        title, 
        description,
        isCompleted:false
    });
    try{
        await task.save();
    }
    catch(err){
        // throw new Error("Couldn't Find the Todo List due to Server Problem.");
        res.status(500).json({success:false, message:"Couldn't add the Todo in List due to Server Problem."});   
    }
    res.status(201).json({success:true, data:task});
}

const patchTask = async (req, res) =>{
    const {taskId} = req.params;
    const {title, description, isCompleted} = req.body;
    
    let existingTask;
    try{
        existingTask = await TaskModel.findById(taskId);
    }
    catch(err){
        res.status(500).json({success:false, message:"Couldn't update the Todo in List due to Server Problem."});
    }

    if(!existingTask)
    {
        res.status(404).json({success:false, message:"No task found with given id!"});
    }
    try{
        if(title)
        existingTask.title = title;
       
        if(description)
        existingTask.description = description;

        if(isCompleted==false || isCompleted==true)
        existingTask.isCompleted = isCompleted;

        await existingTask.save();
    }
    catch(err){
        res.status(500).json({success:false, message:"Couldn't update the Todo in List due to Server Problem."});
    }

    
    res.status(200).json({success:true, data:existingTask}); 
}

const deleteTask = async (req, res) =>{
    const {taskId} = req.params;
    let existingTask;
    try{
    existingTask = await TaskModel.findById(taskId);
    }
    catch(err){
        res.status(500).json({success:false, message:"Couldn't Delete the Todo in List due to Server Problem."});
    }
    if(!existingTask)
    {
        res.status(404).json({success:false, message:"No task found with given id!"});
    }
    try{
        await existingTask.remove();
    }
    catch(err){
        res.status(500).json({success:false, message:"Couldn't Delete the Todo in List due to Server Problem."});
    }

    res.status(200).json({success:true, message:"Task deleted Successfully!"}); 
}

module.exports = {getTasks, postTask, patchTask, deleteTask};