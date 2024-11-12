import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import 'jspdf-autotable';
import jsPDF from 'jspdf' //to generate pdf

function AllTasks(){

    let navigate = useNavigate();
    const location = useLocation();
    const [tasks,setTasks] = useState([]);
    const [searchText, setSearchText] = useState('');

    //print PDF......

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "ToDo Report";
        const headers = [
          [
            "Day",
            "Time",
            "Task",
            "Status"
          ],
        ];
    
        const d = tasks.map((elt) => [
          elt.day,
          elt.time,
          elt.task,
          elt.status
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: d,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(`ToDo.pdf`);
      };
    
    //End of print PDF...

    useEffect(() => {
        if (location.pathname === "/status/complete") {
            getCompletedTasks();
        } else if (location.pathname === "/status/incomplete") {
            getIncompleteTasks();
        } else {
            getTasks();
        }
    }, [location.pathname]);

    const getTasks = () => {
        axios.get('http://localhost:8070/todo/')
            .then((res) => setTasks(res.data))
            .catch((err) => alert(err));
    };

    const getCompletedTasks = () => {
        axios.get('http://localhost:8070/todo/status/complete')
            .then((res) => setTasks(res.data))
            .catch((err) => alert(err));
    };

    const getIncompleteTasks = () => {
        axios.get('http://localhost:8070/todo/status/incomplete')
            .then((res) => setTasks(res.data))
            .catch((err) => alert(err));
    };
    
    function taskUpdate(id){
        console.log(id);
        navigate(`/update/${id}`);
    }

    //Delete a task
    function taskDelete(id){

        axios.delete(`http://localhost:8070/todo/delete/${id}`).then(() =>{
            alert('Are you confirm to delete task??');
            getTasks();
        }).catch((err) =>{
            alert(err);
        })
    }

    const taskStatus = (task) => {
        const updatedStatus = task.status === "Completed" ? "Incomplete" : "Completed";
        
        axios.put(`http://localhost:8070/todo/update/${task._id}`, { status: updatedStatus })
            .then(() => getTasks())
            .catch((err) => alert(err));
    };

    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            getTasks();
        }
        else{      
            const filteredData = tasks.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setTasks(filteredData);
        }
    }



    return(

        <div className="container">
          <br></br>
          <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
          <h3 style={{color: "blue"}}>What You Have To Do??</h3>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
          <input type="search" className="form-control"  placeholder="Search.." onChange={ e => handlesearchArea(e.target.value)}/>
          </div>
          </div>
          <br></br>
          <button className="btn btn-primary" onClick={exportPDF}><i className="fa-solid fa-download"></i>&nbsp;Generate PDF</button>
          <br></br>
          <div>
          <table class="table" celled>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Day</th>
                        <th scope="col">Time</th>
                        <th scope="col">Task</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        
                       {tasks.map((task,index) => (
                            <tr key={task._id}>
                            <td>{index+1}</td>
                            <td>{task.day}</td>
                            <td>{task.time}</td>
                            <td>{task.task}</td>
                            <td>
                               <button
                                onClick={() => taskStatus(task)}
                                className={`btn ${task.status === "Completed" ? "btn-success" : "btn-secondary"}`}
                                >
                                    {task.status}
                               </button>
                            </td>
                            <td>
                            <a href={`/get/${task._id}`}><button type="submit" className="btn btn-primary" style={{color:'white'}}><i className="fas fa-eye"></i>&nbsp;View</button></a>
                            &nbsp;
                            <a href={`/update/${task._id}`}><button type="submit" className="btn btn-warning" onClick={() => taskUpdate(task._id)} ><i className="fas fa-edit"></i>&nbsp;Update</button></a>
                            &nbsp;
                            <button type="submit" className="btn btn-danger"  onClick={() => taskDelete(task._id)}><i className="far fa-trash-alt"></i>&nbsp;Delete</button></td>
                            </tr> 
                         ))
            
                        }
                    </tbody>
                </table>
                <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}><i class="fa-sharp fa-solid fa-plus"></i>&nbsp;Add New Task</a></button>
            </div>

        </div>
    )
}

export default AllTasks;