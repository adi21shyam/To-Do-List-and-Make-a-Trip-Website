const express = require('express');
const mongoose = require('mongoose');

const app = express();


//Making connection to DataBase
mongoose.connect('mongodb://localhost:27017/mongodbtut',{useNewUrlParser:true, useUnifiedTopology: true })
        .then(()=>{console.log("Connection Successful!")})
        .catch((err)=>{console.log("Connection Failed " + err)});

const mySchema = new mongoose.Schema({
    name:{type:String, required:true}, 
    age:Number,
    registeredOn:{type:Date, default : Date.now}
})

const MyModelClass  = new mongoose.model("registration", mySchema);

const myFunctionAsync = async() => {
        const myDocument = new MyModelClass ({
            name:"Twinkle",
            age:20
        });

        const result = await myDocument.save();
        console.log(result);
}
myFunctionAsync();



app.get('/', (req,res) =>{
 res.send("Home Page!");
});

app.listen(3000, ()=>{
    console.log("Server is Listening at localhost:3000");
})
