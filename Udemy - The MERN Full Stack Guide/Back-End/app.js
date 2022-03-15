//Inbuilt Modules
const fs = require('fs');
const path = require('path');

//3rd Party Modules
const express = require('express');
const mongoose = require('mongoose');

//Local Modules
const HttpError = require('./models/http-errors');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(express.json())

//For Serving files because no one outside server can access our files without permission
app.use('/uploads/images', express.static(path.join('uploads','images')))

//For CORS Errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE', 'OPTIONS');
  
    next();
  });

app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoutes);

app.get('/',(req, res)=>{
    console.log("Get Request on Root Url");
    res.send("HOME");
});

app.use((req, res, next)=>{
    const error = new HttpError("Couldn't Find this Route", 404);
    throw error; 
});

app.use((error, req, res, next)=>{
    //If there exists a file in request object means we have to rollback 
    // that upload of file because of any of the Error  
    if(req.file){
        fs.unlink(req.file.path, (err=>{
            if (err) console.log(err);
            else console.log("Deleted file!");
        }));
    }

    if(res.headerSent)  return next(error);

    res.status(error.code || 500); 
    res.json({success:false, message:error.message || "An Unknown error has been occured, Sorry for Inconvenience!"})
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodbcluster.mcnv5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    app.listen((process.env.PORT || '5000'), ()=>{
        console.log("Server is listening on port " + (process.env.PORT || '5000'));
    })
})
.catch((error)=>{
    console.log("A error has been occurred while connecting to database, Sorry for inconvenience !!");
})

