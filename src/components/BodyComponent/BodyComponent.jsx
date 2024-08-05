import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import 'bootstrap/dist/css/bootstrap.min.css';

function BodyComponent() {
  const [tasks, setTasks] = useState([]);

  const formatDate = (date) => {
    const today = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else {
      return `${dd}/${mm}/${yyyy}`;
    }
  };

  const handleAddTask = () => {
    const taskName = document.getElementById("task-name").value;
    const taskDate = new Date(document.getElementById("task-date").value);
    const taskNotes = document.getElementById("task-notes").value;

    if (taskName && taskDate && taskNotes) {
      const newTask = {
        name: taskName,
        dueDate: taskDate,
        notes: taskNotes,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      document.getElementById("task-name").value = "";
      document.getElementById("task-date").value = "";
      document.getElementById("task-notes").value = "";
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const today = new Date();
    today.setHours(12, 0, 0, 0); 

    tasks.forEach((task) => {
      if (task.dueDate.toDateString() === today.toDateString()) {
        const templateParams = {
          user_name: "Jai Pradhiksha",
          user_email: "pradhikshajai@gmail.com",
          subject: `${task.name}`,
          message: `Task: ${task.name}\nDue Date: ${formatDate(task.dueDate)}`,
        };

        emailjs
          .send("service_9a99148", "template_tnvo6gs", templateParams, {
            publicKey: "P5cElfsuS23DH0CRP",
          })
          .then(
            () => {
              console.log("Remainder email sent!");
            },
            (error) => {
              console.log("Error sending remainder email...", error.text);
            }
          );
      }
    });
  }, [tasks]);

  return (
    <div className="container">
      <h2 style={{marginTop : "80px"}}>To-Do List</h2>
      <div className="form-row mb-3">
        <div className="col">
          <input
            type="text"
            id="task-name"
            className="form-control"
            placeholder="Task name"
          />
        </div>
        <div className="col">
          <input type="date" id="task-date" className="form-control" />
        </div>
        <div className="col">
          <input
            type="text"
            id="task-notes"
            className="form-control"
            placeholder="Add Notes"
          />
        </div>
        <div className="col">
          <button onClick={handleAddTask} className="btn btn-primary">
            Add Task
          </button>
        </div>
      </div>
      <table className="table table-hover" style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th>Task name</th>
            <th>Due date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className={task.completed ? "task-completed" : ""}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    onClick={() => handleToggleComplete(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {task.name}
                  </span>
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
              <td>{formatDate(task.dueDate)}</td>
              <td>{task.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default BodyComponent