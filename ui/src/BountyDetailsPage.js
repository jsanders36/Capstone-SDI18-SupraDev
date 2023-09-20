import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Box, Divider } from '@mui/material';

const BountyDetailsPage = () => {
    const [bounty, setBounty] = useState(null);
    const { projectId } = useParams();

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

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Paper elevation={5} style={{ padding: '40px', maxWidth: '800px', width: '100%' }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    {bounty.name}
                </Typography>
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
            </Paper>
        </Box>
    );
}

export default BountyDetailsPage;
