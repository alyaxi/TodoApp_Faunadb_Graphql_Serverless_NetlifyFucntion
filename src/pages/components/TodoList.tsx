import axios from "axios";
import React, { useState } from "react"
import Form from "./Form";
import Task from "./Tasks";
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"
import "./assets/TodoList.css"
import { Button } from "@material-ui/core";

const TodoList = () => {

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
        <div className="wrapper">
            <h1 style={{textAlign:"center", color:"#192a56", marginTop:"20px"}}>Todo App</h1>
            <p style={{textAlign:"center", color:"#192a56", fontSize:"12px"}}>Remember your wish-list</p>
            {identity && identity.isLoggedIn ? (
                <>
                <Button className="button-login" variant="contained" color={isLoggedIn ? "secondary" : "primary"} onClick={() => {setDialog(true)}}>
                 {isLoggedIn ? `Hello ${name} Logout!` : `Login`}
                </Button>
                <Form reloadTask={reloadTask}/>
            {task ? (
                <ul className="List">
                    {task.map(task => {
                        console.log(task);
                        return (
                                <li key={task._id}>
                                    {task.task}
                                    <div>
                                    <Task tasks={task} reloadTask={reloadTask}/>
                                    </div>
                                    </li>
                            
                        )
                    })}
                </ul>
            ): (<p>Loading...</p>)}
                </>
            ): (
                <Button className="button-signup" variant="contained" color="primary" onClick={() => setDialog(true)}>
                    {isLoggedIn ? `Hello ${name}, Logout`: `Login`}
                </Button>
            
            )}
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
            
        </div>
    )
}
export default TodoList 