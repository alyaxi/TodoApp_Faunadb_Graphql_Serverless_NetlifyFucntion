import React from 'react'
import axios from "axios"

export default function Form({reloadTask}) {
    const [task, setTask] = React.useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(task === "") return;

        await axios.post("/api/create-task", {task})

        setTask("");
        reloadTask();
    }
    const getValue = (event) => {
        setTask(event.target.value)
    }
    return (
       <form onSubmit={handleSubmit}>
           <label>
            <input placeholder={"Add Task"} type="text" onChange={getValue} value={task}/>
           </label>
           <button type="submit">Save Task</button>
       </form>
    )
}
