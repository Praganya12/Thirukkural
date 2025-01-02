import React, { useState } from 'react'

const TodoList = () => {
  const [tasks, setTask] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input) {
      setTask([...tasks, input]);
      setInput("");
    }
  }

  const removeTask = (index) => {
    if (confirm("Are you sure to remove this task?"))
      setTask(tasks.filter((task, i) => i !== index))
  }
  return (
    <div className='todo-container'>
      <div className='todo-box'>
        <h2 className='todo-title'>ToDo List</h2>
        <div className='todo-action'>
          <input type="text" name="todo" value={input} onChange={(e) => setInput(e.target.value)} className='task-input' placeholder='What do you want to do?'/>
          <button onClick={addTask} className='add-btn'>Add task</button>
        </div>
        {tasks.length > 0 ? (
          <ul className='task-lists scrollbar'>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button className='remove-btn' onClick={() => removeTask(index)}>
                  <img src='delete-icon.svg' alt='delete' width={20} height={20}/>
                </button>
              </li>
            ))}
          </ul>
        ) : (<p className='no-results'>No results found</p>)}
      </div>
    </div>
  )
}

export default TodoList
