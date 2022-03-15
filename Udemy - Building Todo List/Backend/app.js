const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes.js')
const app = express();
const PORT = process.env.PORT || '5000';
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/todo', todoRoutes);

app.get('/', (req, res)=>{
    res.send('HOME PAGE');
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodbcluster.mcnv5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is Listening on Port " + PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occured while connecting to database!");    
})
