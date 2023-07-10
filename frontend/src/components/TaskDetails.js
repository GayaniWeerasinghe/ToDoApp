import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import girl from '../study.jpg';

export default function TaskDetails(){

    const {id} = useParams();
    let [task,setTask] = useState();

    useEffect(()=>{
        displayTask();
    },[])

    function displayTask(){
            
        axios.get(`http://localhost:8070/todo/get/${id}`).then((res)=> {
            setTask(res.data.tasks)
        }).catch((err)=>{
            alert(err);
        })
    }

    return(

        <div className="container">
            <br></br>
            <h3 style={{color: "blue"}}>Task Details</h3>
            <br></br>
            <div className="row">
            <div className="col-lg-5 mt-2 mb-2">
            {console.log(task)}
            {(task) && (
                 <div className=" w-[500px] h-[500px] flex px-6 py-4 border border-black">
                 <div className="w-5/12 flex flex-col space-y-4">
                   <h5 className="font semibold text=2xl">&nbsp;&nbsp;Day : {task.day}</h5>
                   <br></br>
                   <h5 className="font semibold text=2xl">&nbsp;&nbsp;Time : {task.time}</h5>
                   <br></br>
                   <h5 className="font semibold text=2xl">&nbsp;&nbsp;Task : {task.task}</h5>
                 </div>
                </div>
         )}
            </div>
            <div className="col-lg-5 mt-2 mb-2">
                 <img src={girl} height='300px' width='400px'></img>
            </div>
            </div>
            <br></br>
            <a href="/"><button className="btn btn-success"><i className="fas fa-arrow-left"></i>&nbsp;Go Back</button></a>
            </div>

    )
}