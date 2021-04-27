import axios from "axios";
import React, { useState } from "react"
import Form from "./components/Form";
import Task from "./components/Tasks";
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"


const Index = () => {

    // Fetch data and display over UI

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

    //Login Setup

    const identity = useIdentityContext() // see https://github.com/sw-yx/react-netlify-identity for api of this identity object
    const [dialog, setDialog] = React.useState(false)
    const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "NoName"
  const isLoggedIn = identity && identity.isLoggedIn

    
    return(
        <main>
            <h1>Todo App</h1>
            {identity && identity.isLoggedIn ? (
                <>
                <button onClick={() => {setDialog(true)}}>
                 {isLoggedIn ? `Hello ${name} Logout!` : `Login`}
                </button>
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
                </>
            ): (
                <button onClick={() => setDialog(true)}>
                    {isLoggedIn ? `Hello ${name}, Logout`: `Login`}
                </button>
            
            )}
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
            
        </main>
    )
}
export default Index 