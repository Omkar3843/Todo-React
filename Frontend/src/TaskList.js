import React, { useEffect, useState } from "react";

const TaskList = (props) => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [tasksid, setTasksid] = useState(false); // State to store tasks
  const [loading, setLoading] = useState(true); // Loading state
  const endpoint = "http://localhost:3004/api/tasks"; // API endpoint

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setTasks(data); // Set the fetched data in the state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, [endpoint, tasksid, props?.flag]); // Only runs once when component mounts

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  const onDelete = (deleteId) => {
    // Make DELETE request to the API
    fetch(`http://localhost:3004/api/task/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task deleted successfully:", data);
        setTasksid((prevFlagid) => !prevFlagid);
        // Optionally, you can handle any state updates here, such as removing the task from a task list
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" /> Assigned To
            </th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => {
            const dateObj = new Date(task?.createdAt);

            console.log("dateObj", task?.createdAt);

            // Extract the year, month, and day
            const simpleDate = dateObj.toISOString().split("T")[0]; // Outputs: '2024-09-22'
            return (
              <tr key={task?._id}>
                <td>
                  <input type="checkbox" /> <a href="#">{task?.title}</a>
                </td>
                <td>{task?.completed ? "completed " : "In Progress"}</td>
                <td>{simpleDate}</td>
                <td>{task.priority}</td>
                <td>{task.description}</td>
                <td>
                  <button>Edit</button>
                  <button
                    onClick={() => {
                      onDelete(task._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TaskList;
