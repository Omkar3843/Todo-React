// App.js
import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import "./App.css"; // Assuming styles are in this file

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      assignedTo: "User 1",
      status: "Completed",
      dueDate: "2024-12-10",
      priority: "Low",
      comments: "This task is good",
    },
    {
      id: 2,
      assignedTo: "User 2",
      status: "In Progress",
      dueDate: "2024-09-14",
      priority: "High",
      comments: "This task needs attention",
    },
    {
      id: 3,
      assignedTo: "User 3",
      status: "Not Started",
      dueDate: "2024-08-18",
      priority: "Low",
      comments: "",
    },
    {
      id: 4,
      assignedTo: "User 4",
      status: "In Progress",
      dueDate: "2024-06-12",
      priority: "Normal",
      comments: "This task is important",
    },
  ]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [flag, setFlag] = useState(false);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Tasks</h2>
        <div>
          <button onClick={() => setTaskToEdit(null)}>New Task</button>
        </div>
      </div>
      <TaskForm
        taskToEdit={taskToEdit}
        onSubmit={taskToEdit ? updateTask : addTask}
        setFlag={setFlag}
      />
      <TaskList
        tasks={tasks}
        onEdit={setTaskToEdit}
        onDelete={deleteTask}
        flag={flag}
      />
    </div>
  );
};

export default App;

// App.js
// import React, { useState } from 'react';
// import TaskList from './TaskList';
// import TaskForm from './TaskForm';
// import './App.css';

// const App = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-12-10', priority: 'Low', comments: 'This task is good' },
//     { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This task needs attention' },
//     { id: 3, assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: '' },
//     { id: 4, assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', comments: 'This task is important' }
//   ]);

//   const [taskToEdit, setTaskToEdit] = useState(null);

//   const addTask = (newTask) => {
//     setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
//   };

//   const updateTask = (updatedTask) => {
//     setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
//   };

//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter((task) => task.id !== taskId));
//   };

//   return (
//     <div className="app-container">
//       <div className="header">
//         <h2>Tasks</h2>
//         <div>
//           <button onClick={() => setTaskToEdit(null)}>New Task</button>
//           <button onClick={() => window.location.reload()}>Refresh</button>
//         </div>
//       </div>
//       <input type="text" placeholder="Search" className="search-bar" />
//       <TaskList tasks={tasks} onEdit={setTaskToEdit} onDelete={deleteTask} />
//     </div>
//   );
// };

// export default App;
