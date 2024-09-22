import React, { useState, useEffect } from "react";

const TaskForm = ({ taskToEdit, onSubmit, setFlag }) => {
  const [assignedTo, setAssignedTo] = useState("dsfsf");
  const [status, setStatus] = useState("sdfsf");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [comments, setComments] = useState("dfhsjfs");

  useEffect(() => {
    if (taskToEdit) {
      setAssignedTo(taskToEdit.assignedTo);
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate);
      setPriority(taskToEdit.priority);
      setComments(taskToEdit.comments);
    } else {
      resetForm();
    }
  }, [taskToEdit]);

  const resetForm = () => {
    setAssignedTo("");
    setStatus("");
    setDueDate("");
    setPriority("");
    setComments("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: assignedTo,
      completed: true,
      dueDate,
      priority,
      description: comments,
      _id: taskToEdit ? taskToEdit.id : 1,
    };
    // onSubmit(newTask);
    onTaskSubmit(newTask);

    // resetForm();
  };
  const onTaskSubmit = (newTask) => {
    fetch("http://localhost:3004/api/task", {
      method: "POST", // You could switch this to PUT if editing
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask), // Send the new task as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task added/updated:", data);
        setFlag((prevFlag) => !prevFlag);
      })
      .catch((error) => {
        console.error("Error adding/updating task:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
