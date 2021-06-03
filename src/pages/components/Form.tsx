import React from 'react'
import axios from "axios"
import TextField from '@material-ui/core/TextField'
import { IconButton } from '@material-ui/core';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import "./assets/Form.css"
import Swal from 'sweetalert2'
export default function Form({reloadTask}) {
    
    const [task, setTask] = React.useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(task === "") return;
        await axios.post("/api/create-task", {task})
        setTask("");
        reloadTask();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'task has been added',
            showConfirmButton: false,
            timer: 1500
          })
         
    }
    const getValue = (event) => {
        setTask(event.target.value)
    }
    return (
        <div>
       <form onSubmit={handleSubmit} autoComplete="off" aria-required>
           <div className="fcontainer">
     
           <TextField id="outlined-basic" label="Add New Todo" variant="outlined" value={task} onChange={getValue} required/>
           <div className="fadd">

           <IconButton type="submit" style={{}}><AddCircleOutlinedIcon style={{color:"#192a56", fontSize:"30px"}} /></IconButton>
           </div>
            {/* <input placeholder={"Add Task"} type="text" onChange={getValue} value={task}/> */}
            </div>
       </form>
       </div>
    )
}
