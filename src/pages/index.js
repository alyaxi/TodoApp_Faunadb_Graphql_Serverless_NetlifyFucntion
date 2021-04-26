import axios from "axios";
import React, { useState } from "react"
import Form from "./components/Form";
import Task from "./components/Tasks";


const Index = () => {
    const [status, setStatusCode] = useState("loading");
    const [task, setTask] = useState(null)
    React.useEffect(() => {
        async function fetchTodo(){
        let canceled = false
        if(status !== "loading") return;
         await axios("/api/get-all-todos").then(result => {
            if (canceled === true) return;

            if(result.status !== 200){
                console.log("Error Loading task");
                console.log(result);
                return
            }
            setTask(result.data.tasks)
            setStatusCode("loaded")
            
        })
        return () => {
            canceled = true
        }
    }    
    fetchTodo()
    }, [status])
    const reloadTask = () => {setStatusCode("loading")}
    return(
        <main>
            <h1>Todo App</h1>
            <Form reloadTask={reloadTask}/>
            {task ? (
                <ul>
                    {task.map(task => {
                        console.log(task);
                        return (
                                <li key={task._id}>
                                    <Task tasks={task} reloadTask={reloadTask}/>
                                    </li>
                            
                        )
                    })}
                </ul>
            ): (<p>Loading...</p>)}
        </main>
    )
}
export default Index 