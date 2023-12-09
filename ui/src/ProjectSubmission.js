import React from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useCookies } from 'react-cookie';


const ProjectSubmission = () => {
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
  const [ projectname, setProjectName] = useState("");
  const [ description, setDescription] = useState("");

  const user_id_token = sessionCookies.user_id_token;
  // "name": "proj1 name",
  // "problem_statement": "yep, it's a problem",
  // "submitter_id": 4,
  // "is_approved": false,
  // "is_accepted": false,
  // "accepted_by_id": 1,
  // "is_completed": false

  const handleSubmit = () => {

      fetch(`http://localhost:8080/projects`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${user_id_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: projectname,
          problem_statement: description,
          submitter_id: user_id_token,
          is_approved: false,
          is_accepted: false,
          accepted_by_id: null,
          is_completed: false
        }),
      })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))

      alert("Project Submitted!")
  }

  return (
    <div className="submission" sx={{justifyContent: "center"}}>

                <Card sx={{
                    minWidth: 400,
                    maxWidth: 1000,
                    m: 2,
                    marginLeft: '20%',
                    marginRight: '20%',
                    padding: 1,
                    textAlign: 'center',
                    background: "rgba(255,255,255, 0.85)",
                    borderRadius: '25px',
                    marginTop: '25px'

                }} id='submitContainer'>
                    <h3>Project Submission Form</h3>

               <form id='projectSubmit'>
                        <TextField className='inputText' label='Project Name' variant="outlined" type='text' value={projectname} onChange={(e) => setProjectName(e.target.value)} placeholder='Project Name' size='small' style={{ gap: '10px', margin: '10px' }} />
                        <TextField className='inputText' label='Problem Description' variant="outlined" type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Describe your problem' size='small' multiline rows={5} style={{ gap: '10px', margin: '10px', width: '700px'}} />
                  </form>
                    <Button type='submit' onClick={() => handleSubmit()} variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>Submit</Button>
                </Card>
    </div>
  );
}


export default ProjectSubmission;
=======
import React, { useState } from "react";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useCookies } from 'react-cookie';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const ProjectSubmission = () => {
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
  const [projectname, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const user_id_token = sessionCookies.user_id_token;

  const handleSubmit = () => {

    fetch(`http://localhost:8080/projects`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${user_id_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: projectname,
        problem_statement: description,
        submitter_id: user_id_token,
        is_approved: false,
        is_accepted: false,
        accepted_by_id: null,
        is_completed: false
      }),
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    setDialogOpen(true);
    setDialogContent("Project Submitted!");
}

  return (
    <div className="submission" sx={{ justifyContent: "center" }}>

      <Card sx={{
        minWidth: 400,
        maxWidth: 1000,
        m: 2,
        marginLeft: '20%',
        marginRight: '20%',
        padding: 1,
        textAlign: 'center',
        background: "rgba(255,255,255, 0.85)",
        borderRadius: '25px',
        marginTop: '25px'
      }} id='submitContainer'>
        <h3>Project Submission Form</h3>

        <form id='projectSubmit'>
          <TextField className='inputText' label='Project Name' variant="outlined" type='text' value={projectname} onChange={(e) => setProjectName(e.target.value)} placeholder='Project Name' size='small' style={{ gap: '10px', margin: '10px' }} />
          <TextField className='inputText' label='Problem Description' variant="outlined" type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Describe your problem' size='small' multiline rows={5} style={{ gap: '10px', margin: '10px', width: '700px' }} />
        </form>
        <Button type='submit' onClick={() => handleSubmit()} variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>Submit</Button>
      </Card>

      {dialogOpen && (
        <div>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Submission Status"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogContent}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default ProjectSubmission;

