import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddTask(){

    //to navigate
    let navigate = useNavigate();
    let [day,setDay] = useState("")
    let [time,setTime] = useState("")
    let [task,setTask] = useState("")

    function sendData(e){
        e.preventDefault();

        const newTask = {
            day,time,task
        }

        axios.post('http://localhost:8070/todo/add',newTask).then(() =>{
            alert('Task Added Successfully');
            navigate('/');
        }).catch((err) =>{
            alert(err);
        })
       
        
    }

    return(

        <div className="container">
            <br></br>
            <h3 style={{color: "blue"}}>Add New Task</h3>
            <br></br>
            <form onSubmit={sendData}>
            <div className="mb-3">
                <label for="day" className="form-label">Day</label>
                  <input type="text" className="form-control" id="day" placeholder="Enter Day" 
                     onChange={(e) =>{
                        setDay(e.target.value);
                     }}/>
            </div>
            <div className="mb-3">
                <label for="time" className="form-label">Time</label>
                  <input type="text" className="form-control" id="time" placeholder="Enter Time"
                  onChange={(e) =>{
                    setTime(e.target.value);
                 }}/>
            </div>
            <div className="mb-3">
                <label for="task" className="form-label">Task</label>
                  <input type="text" className="form-control" id="task" placeholder="Enter Task"
                  onChange={(e) =>{
                    setTask(e.target.value);
                 }}/>
            </div>
            <button type="submit" className="btn btn-success"><i className="far fa-check-square"></i><a href="/"></a>&nbsp;Save</button>
            </form>
        </div>
    )
}

export default AddTask;