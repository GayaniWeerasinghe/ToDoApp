const router = require("express").Router();
let Task = require("../models/todo");

//add task -- http://localhost:8070/todo/add
router.route("/add").post((req,res) => {
    const {day,time,task,status} = req.body;  //destructure

    const newTask = new Task({
        day,
        time,
        task,
        status
    })
        
    newTask.save().then(()=> {
        res.json("Task added.")
    }).catch((err) =>{
        console.log(err)
    })

})

//get tasks -- http://localhost:8070/todo/
router.route("/").get((req,res) => {

    Task.find().then((tasks) => {
        res.json(tasks);
    }).catch((err) => {
        console.log(err);
    })
})

//update a task -- http://localhost:8070/todo/update/ghj32gftredhhkjk
router.route("/update/:id").put(async(req,res)=>{
    const ID = req.params.id;
    const {day,time,task,status} = req.body;
    const updateTask ={
        day,time,task,status
    }

    await Task.findByIdAndUpdate(ID,updateTask).then((updateTask)=>{
        res.status(200).send({status:'Task Updated',tasks:updateTask})
    }).catch((err)=>{
        res.status(500).send({status:'Error with updating',error:err.message})
    })
})

//delete a task -- http://localhost:8070/todo/delete/ghj32gftredhhkjk
router.route("/delete/:id").delete(async(req,res)=>{
    const ID = req.params.id;

    await Task.findByIdAndDelete(ID).then(()=>{
        res.status(200).send({status:'Task Deleted'})
    }).catch((err)=>{
        res.status(500).send({status:'Error with deleting',error:err.message})
    })
})

//get a task -- http://localhost:8070/todo/get/ghj32gftredhhkjk
router.route("/get/:id").get(async(req,res)=> {

    const ID = req.params.id;

    await Task.findById(ID).then((task)=>{
        res.status(200).send({status:"Task Fetched",tasks:task})
    }).catch((err)=>{
        res.status(500).send({status:'Error with fetching',err:err.message})
    })
})

// Get incomplete tasks -- http://localhost:8070/todo/status/incomplete
router.route("/status/incomplete").get((req, res) => {
    Task.find({ status: "Incomplete" })
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with fetching incomplete tasks", error: err.message });
        });
});

// Get complete tasks -- http://localhost:8070/todo/status/complete
router.route("/status/complete").get((req, res) => {
    Task.find({ status: "Completed" })
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with fetching complete tasks", error: err.message });
        });
});


module.exports = router;