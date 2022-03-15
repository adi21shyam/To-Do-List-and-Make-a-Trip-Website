const mongoose = require('mongoose')

const TaskModel = new mongoose.Schema({

    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    isCompleted:{
        required:true,
        type:Boolean
    }
});

module.exports = mongoose.model("Todo", TaskModel);