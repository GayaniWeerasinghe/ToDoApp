import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import AllTasks from './components/AllTasks';
import EditTask from './components/EditTask';
import TaskDetails from './components/TaskDetails';
import AddTask from './components/AddTask';


function App() {
  return (
     <Router>
     <div className='bg'>
        <Navbar/>
        <Routes>
        <Route path="/get/:id" element = {<TaskDetails/>} />
        <Route path="/update/:id" element = {<EditTask/>} />
        <Route path="/add" element = {<AddTask/>} />
        <Route path="/" element = {<AllTasks/>} />
        <Route path="/status/complete" element = {<AllTasks/>} />
        <Route path="/status/incomplete" element = {<AllTasks/>} />
        </Routes>
     </div>
     </Router>
  );
}

export default App;