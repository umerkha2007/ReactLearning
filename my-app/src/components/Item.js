import React from 'react'
import { useState } from 'react'

function Item() {
    const [tasks, setTasks] = useState([
        {
          "id": 1,
          "text": "Doctors Appointment",
          "day": "Feb 5th at 2:30pm",
          "reminder": true
        },
        {
          "id": 2,
          "text": "Meeting at School",
          "day": "Feb 6th at 1:30pm",
          "reminder": true
        }
      ]);
    
    const addTask = (event) => {
        setTasks((tasks) => {
            console.log(tasks)
            return [...tasks, {
            "id": tasks[tasks.length - 1].id + 1,
            "text": "I was added later",
            "day": "Feb 6th at 1:30pm",
            "reminder": true
        }
    ]}
    )}
    return (
        <div>
            {tasks.map((task) => (
                <h3 onClick={addTask} key={task.id}>{task.text}</h3>
            ))}
        </div>
    )
}

export default Item
