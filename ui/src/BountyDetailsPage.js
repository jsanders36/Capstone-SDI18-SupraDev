import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Paper, Typography, Box, Divider } from '@mui/material';
import { useCookies, CookiesProvider } from 'react-cookie';

const BountyDetailsPage = () => {
    const [bounty, setBounty] = useState(null);
    const { projectId } = useParams();
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
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
                "is_approved": true
            })
        })
        navigate('/projects');
        window.location.reload()

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
        window.location.reload()
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
        window.location.reload()
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Paper elevation={5} style={{ padding: '40px', maxWidth: '800px', width: '100%' }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    {bounty.name}
                </Typography>

                {(sessionCookies.userPriv_Token === true) && (bounty.is_approved === true ) && (bounty.is_accepted === false) && (bounty.is_completed === false) ?  <Button onClick={() => handleAccept()} variant="contained" color="success" style={{ margin: '5px' }} >Accept This Project?</Button>  : <></>}

                {(bounty.accepted_by_id === sessionCookies.user_id_token)  && (bounty.is_completed === false) ?  <Button onClick={() => handleComplete()} variant="contained" color="success" style={{ margin: '5px' }} >Complete the project?</Button>  : <></>}

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

                {(sessionCookies.userPriv_Token === true)  && (bounty.is_completed === false) ?  <Button onClick={() => thanosSnap()} variant="contained" color="error" style={{ margin: '5px' }}>Deny</Button>  : <></>}
            </Paper>
        </Box>
    );
}

export default BountyDetailsPage;
