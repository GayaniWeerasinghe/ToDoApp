import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams,useNavigate} from "react-router-dom";

function EditTask(){

  let navigate = useNavigate();
  let { id } = useParams();
  let [day,setDay] = useState("")
  let [time,setTime] = useState("")
  let [task,setTask] = useState("")

  const data = {
    day:day,
    time: time,
    task:task
  }

   //loading existing data to form
   useEffect(() =>{
        loadTask();
    },[])

    function loadTask(){
      axios.get(`http://localhost:8070/todo/get/${id}`).then((res) =>{
          setDay(res.data.tasks.day);
          setTime(res.data.tasks.time);
          setTask(res.data.tasks.task);
      }).catch((err) =>{
          alert(err);
      })
  }

    function onSubmit(e){
        e.preventDefault();
        axios.put(`http://localhost:8070/todo/update/${id}`,data)
          .then((res) => {
            console.log(res.data);
            navigate('/');
            alert("Task updated successfully");
          })
          .catch((err) => {
            alert(err);
          });
      };

    return(
        <div className="container">
            <br></br>
            <h3 style={{color: "blue"}}>Update Task</h3>
            <br></br>
            <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label for="day" className="form-label">Day</label>
                  <input type="text" className="form-control" id="day" value={day} placeholder="Enter Day" 
                     onChange={(e) =>
                        setDay(e.target.value)
                     }/>
            </div>
            <div className="mb-3">
                <label for="time" className="form-label">Time</label>
                  <input type="text" className="form-control" id="time" value={time} placeholder="Enter Time"
                  onChange={(e) =>
                    setTime(e.target.value)
                 }/>
            </div>
            <div className="mb-3">
                <label for="task" className="form-label">Task</label>
                  <input type="text" className="form-control" id="task" value={task} placeholder="Enter Task"
                  onChange={(e) =>
                    setTask(e.target.value)
                 }/>
            </div>
            <button type="submit" className="btn btn-success"><i className="fas fa-edit"></i>&nbsp;Update</button>
            </form>
        </div>
    )
}

export default EditTask;