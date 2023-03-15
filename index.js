const express=require("express");
const cors= require ("cors")
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser')
const routes= require("./routes/todoRoute")
const {json}=require("express")
require('dotenv').config();


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({  extended:false}));


//PORT connection
const port= process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`listening port ${port}`);
});


//mongoDb connection
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('connected Successfully...'))
    .catch((err)=> console.log(err))



   app.use('/api',routes);

