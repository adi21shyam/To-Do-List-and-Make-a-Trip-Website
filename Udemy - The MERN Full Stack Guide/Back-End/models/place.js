//3rd Party Modules
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    location:{
        lat:{
            required:true,
            type:Number
        },
        lng:{
            required:true,
            type:Number
        },
    },
    image:{
        required:true,
        type:String
    },
    creator:{
        required:true,
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('Place',placeSchema);