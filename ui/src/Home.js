import React from 'react';
import { CardContent, Typography, Box, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';

const HomePage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="40px"
            height="100%"

        >



            {/* Hero Section */}


            <Typography variant="h1" color="primary.contrastText" style={{ fontWeight: 600 }}>
                    Welcome to Supra Dev !
                </Typography>

            <Box
                width="80%"
                bgcolor="white"
                p={5}
                borderRadius={5}
                boxShadow={5}
            >

                {/* Announcements */}
                <Box mb={4}>
                    <Typography variant="h4" mb={2} fontWeight="bold" gutterBottom>Announcements</Typography>

                    <Paper elevation={3} variant="outlined" style={{ borderRadius: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" mb="10px">Top Bounty: Project X</Typography>
                            <Typography variant="h6" color="primary" mb="10px">Project T has been finalized and deployed into...</Typography>
                        </CardContent>
                    </Paper>
                </Box>

                {/* Highlights */}
                <Box mb={4}>
                    <Typography variant="h4" mb={2} fontWeight="bold" gutterBottom>Highlights</Typography>

                    <Paper elevation={3} variant="outlined" style={{ borderRadius: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" mb="10px">Success! Project J made major breakthroughs in XYZ</Typography>
                            <Typography variant="h6" color="primary" mb="10px">Supra Coder Snuffy figured out how to install DOOM in My...</Typography>
                        </CardContent>
                    </Paper>
                </Box>

                {/* Divider to separate sections */}
                <Divider variant="middle" sx={{ my: 4 }} />

                {/* Latest Notifications */}
                <Box mb={4}>
                    <Typography variant="h5" mb="20px" fontWeight="bold" gutterBottom>Latest Notifications</Typography>

                </Box>

                {/* User Activity */}
                <Box>
                    <Typography variant="h5" mb="20px" fontWeight="bold" gutterBottom>Recent Activity</Typography>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><i className="fas fa-plus"></i></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Added a new project: Project XYZ." secondary="1 day ago" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><i className="fas fa-trophy"></i></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Claimed a bounty from John's project." secondary="2 days ago" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><i className="fas fa-user-edit"></i></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Updated profile information." secondary="3 days ago" />
                        </ListItem>
                    </List>
                </Box>

            </Box>
        </Box>
    );
}

export default HomePage;
