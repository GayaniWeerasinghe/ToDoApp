const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toToSchema = new Schema({
    day:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    task:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default: "Incomplete" 
    }
})

const Task = mongoose.model("Task",toToSchema); //create a collection
module.exports = Task;