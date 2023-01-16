const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8070;  // If 8070 port not available,use a port which is available

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

//Creating routes
const todoRoute = require('./routes/ToDo');
//http://localhost:8070/todo
app.use("/todo",todoRoute);

//Database connection
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log('Database Connected Successfully');
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

