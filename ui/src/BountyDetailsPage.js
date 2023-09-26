import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Paper, Typography, Box, Divider } from '@mui/material';
import { useCookies } from 'react-cookie';
import TextField from '@mui/material/TextField';

const BountyDetailsPage = () => {
    const [bounty, setBounty] = useState(null);
    const { projectId } = useParams();
    const [doubloons, setDoubloons] = useState("")
    const [sessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:8080/projects/${projectId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data);
                if (data && data.length) {
                    setBounty(data[0]);
                }
            })
            .catch((error) => {
                console.error("There was an error fetching the bounty:", error);
            });
    }, [projectId]);

    if (!bounty) {
        return <Typography align="center" style={{ marginTop: '2rem' }}>Loading...</Typography>;
    }

    const handleApprove = () => {

        fetch(`http://localhost:8080/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "is_approved": true,
                "bounty_payout": doubloons
            })
        })
        navigate('/projects');


    }

    const handleAccept = () => {

        fetch(`http://localhost:8080/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "is_accepted": true,
                "accepted_by_id" : sessionCookies.user_id_token
            })
        })
        navigate('/projects');
        window.location.reload();
    }

    const handleUnaccept = () => {

        fetch(`http://localhost:8080/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "is_accepted": false,
                "accepted_by_id" : sessionCookies.user_id_token
            })
        })
        navigate('/projects');
        window.location.reload();
    }

    const handleComplete = () => {

        fetch(`http://localhost:8080/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "is_completed": true,
                "is_accepted": false
            })
        })
        navigate('/projects');
    }

    const thanosSnap = () => {

        fetch(`http://localhost:8080/projects/${projectId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        navigate('/projects');
    }

    return (
      <Box display="flex" justifyContent="center" minHeight="100vh" bgcolor="rgba(255, 255, 255, 0)">
          
        <Paper elevation={5} style={{borderRadius: '25px', background:'rgba(255,255,255, 0.85)', padding: '40px', marginTop: '25px', maxHeight: '400px', maxWidth: '800px', width: '100%' }}>
                
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>
            {bounty.name}
          </Typography>

          {sessionCookies.userPriv_Token === true &&
          bounty.is_approved === false &&
          bounty.is_completed === false ? (
            <TextField
              fullWidth
              className="inputText"
              label="Doubloons"
              variant="outlined"
              type="text"
              value={doubloons}
              onChange={(e) => setDoubloons(e.target.value)}
              placeholder="Doubloons"
              size="small"
              margin="normal"
            />
          ) : (
            <></>
          )}

          <Typography
            variant="h5"
            gutterBottom
            color="blue"
            style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>
            Bounty: {bounty.bounty_payout}
            {sessionCookies.userPriv_Token === true &&
            bounty.is_approved === false &&
            bounty.is_completed === false ? (
              <></>
            ) : (
              <></>
            )}
            ! Supra Doubloons
          </Typography>

          {sessionCookies.userPriv_Token === true &&
          bounty.is_approved === true &&
          bounty.is_accepted === false &&
          bounty.is_completed === false ? (
            <Button
              onClick={() => handleAccept()}
              variant="contained"
              color="success"
              style={{ margin: "5px" }}>
              Accept this project?
            </Button>
          ) : (
            <></>
          )}

          {bounty.accepted_by_id === sessionCookies.user_id_token &&
          bounty.is_completed === false &&
          bounty.is_accepted === true ? (
            <Button
              onClick={() => handleUnaccept()}
              variant="contained"
              color="error"
              style={{ margin: "5px" }}>
              Unaccept this project?
            </Button>
          ) : (
            <></>
          )}

          {bounty.accepted_by_id === sessionCookies.user_id_token &&
          bounty.is_completed === false &&
          bounty.is_accepted === true ? (
            <Button
              onClick={() => handleComplete()}
              variant="contained"
              color="success"
              style={{ margin: "5px" }}>
              Complete the project?
            </Button>
          ) : (
            <></>
          )}

          <Divider style={{ marginBottom: "1.5rem" }} />
          <Typography
            variant="h6"
            style={{ fontWeight: "500", color: "#616161" }}>
            Problem Statement:
          </Typography>
          <Typography
            paragraph
            style={{
              fontSize: "1rem",
              marginTop: "0.5rem",
              marginBottom: "1.5rem",
            }}>
            {bounty.problem_statement}
          </Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: "500", color: "#616161" }}>
            Submitter ID:
          </Typography>
          <Typography
            paragraph
            style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
            {bounty.submitter_id}
          </Typography>
          <Typography
            color="textSecondary"
            align="right"
            style={{ marginTop: "1.5rem" }}>
            Thank you for viewing this bounty detail. Check back often for
            updates!
          </Typography>

          {sessionCookies.userPriv_Token === true &&
          bounty.is_approved === false &&
          bounty.is_completed === false ? (
            <Button
              onClick={() => handleApprove()}
              variant="contained"
              color="success"
              style={{ margin: "5px" }}>
              Approve
            </Button>
          ) : (
            <></>
          )}

          {sessionCookies.userPriv_Token === true &&
          bounty.is_approved === false &&
          bounty.is_completed === false ? (
            <Button
              onClick={() => thanosSnap()}
              variant="contained"
              color="error"
              style={{ margin: "5px" }}>
              Deny
            </Button>
          ) : (
            <></>
          )}
        </Paper>
      </Box>

        <Box display="flex" justifyContent="center" minHeight="100vh" bgcolor="rgba(255, 255, 255, 0)">
            <Paper elevation={5} style={{borderRadius: '25px', background:'rgba(255,255,255, 0.85)', padding: '40px', marginTop: '25px', maxHeight: '400px', maxWidth: '800px', width: '100%' }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    {bounty.name}
                </Typography>

                {(sessionCookies.userPriv_Token === true) && (bounty.is_approved === true ) && (bounty.is_accepted === false) && (bounty.is_completed === false) ?  <Button onClick={() => handleAccept()} variant="contained" color="success" style={{ margin: '5px' }} >Accept this project?</Button>  : <></>}

                {(bounty.accepted_by_id === sessionCookies.user_id_token)  && (bounty.is_completed === false) && (bounty.is_accepted === true) ?  <Button onClick={() => handleUnaccept()} variant="contained" color="error" style={{ margin: '5px' }} >Unaccept this project?</Button>  : <></>}

                {(bounty.accepted_by_id === sessionCookies.user_id_token)  && (bounty.is_completed === false) && (bounty.is_accepted === true)?  <Button onClick={() => handleComplete()} variant="contained" color="success" style={{ margin: '5px' }} >Complete the project?</Button>  : <></>}

                <Divider style={{ marginBottom: '1.5rem' }} />
                <Typography variant="h6" style={{ fontWeight: '500', color: '#616161' }}>Problem Statement:</Typography>
                <Typography paragraph style={{ fontSize: '1rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    {bounty.problem_statement}
                </Typography>
                <Typography variant="h6" style={{ fontWeight: '500', color: '#616161' }}>Submitter ID:</Typography>
                <Typography paragraph style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                    {bounty.submitter_id}
                </Typography>
                <Typography color="textSecondary" align="right" style={{ marginTop: '1.5rem' }}>
                    Thank you for viewing this bounty detail. Check back often for updates!
                </Typography>

                {(sessionCookies.userPriv_Token === true) && (bounty.is_approved === false)  && (bounty.is_completed === false) ?  <Button onClick={() => handleApprove()} variant="contained" color="success" style={{ margin: '5px' }} >Approve</Button>  : <></>}

                {(sessionCookies.userPriv_Token === true) && (bounty.is_approved === false) && (bounty.is_completed === false)?  <Button onClick={() => thanosSnap()} variant="contained" color="error" style={{ margin: '5px' }}>Deny</Button>  : <></>}
            </Paper>
        </Box>
    );
}

export default BountyDetailsPage;
