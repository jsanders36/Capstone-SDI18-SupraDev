import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar, Box, Card, CardContent, CardHeader, Grid, List, ListItem,
    ListItemAvatar, ListItemText, Typography, Paper, Button, Container,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HoverCard = styled(motion(Card))(({ theme }) => ({
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme?.shadows?.[8] ?? '0px 4px 20px rgba(0, 0, 0, 0.2)',
    },
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(5px)',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}));

const HomePage = () => {
    const theme = useTheme();

    return (
        <Box
            component={motion.div}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                backgroundImage: 'url(/path-to-your-space-background-image)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Hero Section */}
            <Paper elevation={3} sx={{
                width: '100%',
                textAlign: 'center',
                padding: '40px 0',
                mb: 4,
                backgroundImage: 'linear-gradient(135deg, #020024 0%, #090979 37%, #00d4ff 100%)',
                color: '#FFF',
                borderRadius: '15px',
            }}>
                <Typography variant="h2" fontWeight="600" fontFamily="'Orbitron', sans-serif">
                    Welcome to Supra Dev!
                </Typography>
                <Typography variant="subtitle1" mt={2} fontFamily="'Orbitron', sans-serif">
                    Bridging the Gap Between Creativity and Collaboration
                </Typography>
                <Link to="/Login" style={{ textDecoration: 'none', marginTop: '20px' }}>
                    <Box mt={3}>
                        <Button variant="contained" style={{ backgroundColor: theme?.palette?.primary?.main || 'purple', color: '#fff' }} endIcon={<ArrowForwardIcon />}>
                            Get Started
                        </Button>
                    </Box>
                </Link>
            </Paper>


            <Container maxWidth="lg">
                <Grid container spacing={4} direction="row">
                    {/* Announcements */}
                    <Grid item xs={12} md={6}>
                        <HoverCard elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                            <CardHeader title="Announcements" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Top Bounty: Project X
                                </Typography>
                                <Typography variant="body1" mt={1}>
                                    Project T has been finalized and deployed into...
                                </Typography>
                            </CardContent>
                        </HoverCard>
                    </Grid>

                    {/* Highlights */}
                    <Grid item xs={12} md={6}>
                        <HoverCard elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                            <CardHeader title="Highlights" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Success! Project J made major breakthroughs in XYZ
                                </Typography>
                                <Typography variant="body1" mt={1}>
                                    Supra Coder Snuffy figured out how to install DOOM in My...
                                </Typography>
                            </CardContent>
                        </HoverCard>
                    </Grid>

                    {/* Latest Notifications */}
                    <Grid item xs={12} md={6}>
                        <HoverCard elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                            <CardHeader title="Latest Notifications" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                            <CardContent>
                                <Typography variant="subtitle1" color="textSecondary">
                                    You have 3 new project invitations!
                                </Typography>
                            </CardContent>
                        </HoverCard>
                    </Grid>

                    {/* User Activity */}
                    <Grid item xs={12} md={6}>
                        <HoverCard elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                            <CardHeader title="Recent Activity" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                            <CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i className="fas fa-plus"></i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Added a new project: Project XYZ." secondary="1 day ago" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i className="fas fa-trophy"></i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Claimed a bounty from John's project." secondary="2 days ago" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i className="fas fa-user-edit"></i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Updated profile picture." secondary="5 days ago" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </HoverCard>
                    </Grid>

                    {/* Footer */}
                    <Grid item xs={12}>
                        <Box sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'white', backgroundImage: 'linear-gradient(135deg, #020024 0%, #090979 37%, #00d4ff 100%)' }}>

                            <Typography variant="body2">
                                © 2023 Supra Dev. All Rights Reserved.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;
