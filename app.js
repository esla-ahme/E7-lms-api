const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');

const studentRoute = require('./routes/students');
const courseRoute = require('./routes/courses');
const courseFormRoute = require('./routes/coursesForm');
const studentFormRoute = require('./routes/studentForm');


//Middlewares
//Routes
app.use('/api/students', studentRoute);
app.use('/api/courses', courseRoute);
app.use('/web/courses/create', courseFormRoute)
app.use('/web/students/create', studentFormRoute)

app.use(express.json());



// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



//conect to db
mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to db");
    })
//Listen
app.listen(3500);