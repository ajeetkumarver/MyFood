const mongoose = require('mongoose');
const mongoURI='mongodb+srv://myfood:Ajeet12@@cluster0.ajlzsn9.mongodb.net/?retryWrites=true&w=majority';

const connectToMongoDb=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected");
    });
}

module.exports=connectToMongoDb;
