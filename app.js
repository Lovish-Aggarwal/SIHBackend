const mongoose = require('mongoose');
const express = require("express");
const app = express();

//myfile

const InstituteAuthRoutes = require('./routes/authInsitute');
const aicteAuthRoutes = require('./routes/authAicte');
const FacultyMembersAuthRoutes = require('./routes/authFacultyMembers');

//npm packages
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//middlewares
app.use(express.json());//body parser

app.use(cookieParser());
//cookieParser is used in inserting the jwt (JSON WEB TOKEN) in user's browser;

app.use(cors());

app.use("/auth",InstituteAuthRoutes);
app.use("/auth/aicte",aicteAuthRoutes);
app.use("/auth/facultymembers",FacultyMembersAuthRoutes);

mongoose.connect('mongodb://localhost:27017/SIH')
.then(()=>{
  console.log("connected to database")
})
.catch((err)=>{
  console.log(err);
})


app.listen(3100,()=>{
  console.log(`listening to port 3100`)
})

