import React from 'react'
import axios from "axios"

export default function Task({task, reloadTask}) {

    const [updateTask, setUpdateTask] = React.useState("")

    const deleteTodo = () => {
        
        axios.post("/api/delete-task", {id:task._id})
        .then(reloadTask)
    }
    const updateTodo = () => {
        axios.post("/api/update-task",{id: task._id, task: updateTask}).then(reloadTask)
        if(task._id === updateTask._id)return

    }

    return (
        <div>
            <p>{task.task}</p>
            <button onClick={deleteTodo}>X</button>
        </div>
        
    )
}
