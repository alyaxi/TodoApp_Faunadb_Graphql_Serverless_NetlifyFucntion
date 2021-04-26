import React from 'react'
import axios from "axios"

export default function Task({tasks, reloadTask}) {
    const task = tasks

    if (!task) return null                             
 

    const deleteTodo = () => {
        axios.post("/api/delete-task", {id:task._id}).then(reloadTask)
    }
  

    return (
      
            <div>
            <p>{task.task}</p>
            <button onClick={deleteTodo}>Delete</button>
        </div>
       
        
        
    )
}
