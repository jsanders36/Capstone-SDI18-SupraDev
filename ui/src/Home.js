import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Paper, Button, IconButton, Container, } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HoverCard = styled(motion(Card))({
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    },
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
});

const HomePage = () => {
    const theme = useTheme();
    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
    };
    const primaryMainColor = theme?.palette?.primary?.main || '#000';

    return (
        <Box
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={variants}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                backgroundImage: 'url(/path-to-your-background-image)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '.heroSection': {
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    color: primaryMainColor,
                },
                '.card': {
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)',
                },
            }}
        >
            {/* Hero Section */}
            <Paper className="heroSection" elevation={3} sx={{ width: '100%', textAlign: 'center', padding: '40px 0', mb: 4 }}>
                <Typography variant="h2" fontWeight="600">
                    Welcome to Supra Dev!
                </Typography>
                <Typography variant="subtitle1" mt={2}>
                    Bridging the Gap Between Creativity and Collaboration
                </Typography>
                <Link to="/Login" style={{ textDecoration: 'none', marginTop: '20px' }}>
                    <Box mt={3}>
                        <Button variant="contained" style={{ backgroundColor: 'purple', color: '#fff' }} endIcon={<ArrowForwardIcon />}>
                            Get Started
                        </Button>
                    </Box>
                </Link>
            </Paper>

            <Container maxWidth="lg">
                <Grid container spacing={4} direction="column">
                    {/* Announcements */}
                    <Grid item xs={12}>
                        <HoverCard className="card" elevation={3}>
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
                    <Grid item xs={12}>
                        <HoverCard className="card" elevation={3}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                                        <ListItemText primary="Updated profile information." secondary="3 days ago" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </HoverCard>
                    </Grid>

                    {/* Footer */}
                    <Grid item xs={12}>
                        <Box sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'white' }}>
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
