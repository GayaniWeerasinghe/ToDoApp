import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';
import EditTask from './components/EditTask';
import TaskDetails from './components/TaskDetails';

function App() {
  return (
     <Router>
     <div>
        <Navbar/>
        <Routes>
        <Route path="/get/:id" element = {<TaskDetails/>} />
        <Route path="/update/:id" element = {<EditTask/>} />
        <Route path="/add" element = {<AddTask/>} />
        <Route path="/" element = {<AllTasks/>} />
        </Routes>
     </div>
     </Router>
  );
}

export default App;