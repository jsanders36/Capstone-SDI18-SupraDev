import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useCookies, CookiesProvider } from 'react-cookie';


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
    <div className="submission">

                <Card sx={{
                    minWidth: 400,
                    maxWidth: 1000,
                    m: 2,
                    marginLeft: '10%',
                    padding: 1,
                    textAlign: 'center'
                }} id='submitContainer'>
                    <h3>Project Submission Form</h3>

               <form id='projectSubmit'>
                        <TextField className='inputText' label='Project Name' variant="outlined" type='text' value={projectname} onChange={(e) => setProjectName(e.target.value)} placeholder='Project Name' size='small' style={{ gap: '10px', margin: '10px' }} />
                        <TextField className='inputText' label='Problem Description' variant="outlined" type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Describe your problem' size='small' style={{ gap: '10px', margin: '10px', width: '800px'}} />
                  </form>
                    <Button type='submit' onClick={() => handleSubmit()} variant='contained' color='success' style={{ gap: '10px', margin: '10px' }}>Submit</Button>
                </Card>
    </div>
  );
}


export default ProjectSubmission;