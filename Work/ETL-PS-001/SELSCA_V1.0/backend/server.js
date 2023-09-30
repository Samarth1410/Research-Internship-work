const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

//initializing parameters from .env file (ask project manager for the file)
require("dotenv").config();

// routes for API requests 
var registerRoute = require("./routes/register");
var loginRoute = require('./routes/login');
var gradesRoute = require('./routes/grades');
var syllabusRoute = require('./routes/syllabus');
var infoRoute = require('./routes/info');

// middleware
app.use(cors());

// using body-parser module for parsing the body to components
app.use(bodyparser.json({limit : "50mb"}))
app.use(bodyparser.urlencoded({limit: '50mb' , extended: true}))


//connection to the mongodb server using mongoose
mongoose.set('strictQuery' , false)
mongoose.connect (process.env.mongodb_connection + process.env.db_name , {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open' , function(){
    console.log("MongoDB connection established !")
})

//API endpoints
app.use("/register" , registerRoute);
app.use("/login" , loginRoute);
app.use("/grades" , gradesRoute);
app.use("/syllabus" , syllabusRoute);
app.use('/info' , infoRoute);

//starting of the server on PORT(specified in the .env file)
app.listen(process.env.PORT , () => {console.log("server running on port : " +  process.env.PORT)})
