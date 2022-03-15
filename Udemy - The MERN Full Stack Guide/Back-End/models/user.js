//3rd Party Modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        minlength:6,
        type:String
    },
    places:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Place'
    }],
    image:{
        required:true,
        type:String
    }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);