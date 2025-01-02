import React, { useEffect, useState } from 'react';

import './TodoApp.css'

const TodoApp = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") ?? "[]"));
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // add new task
  const addTask = () => { 
    if (!newTask.trim()) return;
    const newObj = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false
    };
    setTasks([...tasks, newObj]);
    setNewTask("");
  }

  // toggle completed status
  const toggleComplete = (id: number) => {
    const updatedTask = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTask);
  }

  // delete task
  const deleteTask = (id: number) => {
    if (confirm("Are you sure to delete?")) {
      const filteredTask = tasks.filter((task) => task.id !== id);
      setTasks(filteredTask);
    }
  }

  // edit task
  const editTask = (task: { id: number, text: string }) => {
    setIsEditing(true);
    setEditId(task.id);
    setNewTask(task.text); // Use task.text to get the text of the task
  }

  const updateTask = () => {
    const updatedTasks = tasks.map((task) => task.id === editId ? { ...task, text: newTask.trim() } : task);
    setTasks(updatedTasks);
    setEditId(null);
    setIsEditing(false);
    setNewTask("");
  }

  return (
    <div className='app-container'>
      <div className="input-container">
        <input
          type="text"
          placeholder='enter a task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className='task-input'
        />
        <button onClick={isEditing ? updateTask : addTask}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul className='task-list'>
        {tasks.length === 0 ? <p>No tasks Found</p> :
          tasks.map((task) =>
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <div>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  className='task-checkbox' 
                  onChange={() => toggleComplete(task.id)} 
                />
                <span>{task.text}</span>
              </div>
              <div>
                <button className='edit-button' onClick={() => editTask(task)}>Edit</button>
                <button className='delete-button' onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default TodoApp;
