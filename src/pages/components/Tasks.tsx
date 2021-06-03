import React, { useState } from "react";
import axios from "axios";
import "../assets/Tasks.css";
import {
  Backdrop,
  Button,
  Fab,
  Fade,
  Modal,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2'
import "@sweetalert2/theme-bulma/bulma.css"

export default function Task({ tasks, reloadTask }) {
 
  const [updated, setUpdated] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    })
    );
    
  const classes = useStyles();

  if (!tasks) return null;

  console.log("upd tasked" + updated);
  const deleteTodo = async () => {
    await axios.post("/api/delete-task", { id: tasks._id }).then(reloadTask);
    
  };
  const updateData = async (id, task) => {
    console.log("scope " + id + " " + task);

    return await axios
      .put(`/api/update-task`, { id: id, task })
      .then((data) => {
        reloadTask(data);
        setOpen(false);
        setUpdated(""); 
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'task has been updated',
          showConfirmButton: false,
          timer: 1500
        })
       
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getValue = (e) => {
    setUpdated(e.target.value);
  };

  return (
    <div className="buttons">
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        
        <form
          onSubmit={(e) => {
            console.log("updated" + updated + currentId);
            updateData(currentId, updated);   
            e.preventDefault();
           
          }}
        >
          <div className="update-container-div">
        
          <TextField className="text-field" id="outlined-basic" label="Update Todo" variant="outlined" value={updated} onChange={getValue} required/>
          
          <Button type="submit" variant="contained" color="primary">Update Task</Button>
          </div>
        </form>
        </Fade>
      </Modal>
      <Fab
        style={{ width: "35px", height: "30px", margin: "5px" }}
        color="primary"
        aria-label="edit"
        onClick={() => {
          setCurrentId(tasks._id);
          setOpen(true);
        }}
      >
        <EditIcon />
      </Fab>
      <Fab
        style={{ width: "35px", height: "30px", margin: "5px" }}
        onClick={() => {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            padding:"20px",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
         
          }).then((result) => {
            if (result.isConfirmed) {
              deleteTodo()
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
        }}
        color="secondary"
        aria-label="delete"
      >
        <DeleteIcon />
      </Fab>
    </div>
  );
}
