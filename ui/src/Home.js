import React from 'react';
import { CardContent, Typography, Box, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Grid, Card } from '@mui/material';

const HomePage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="40px"
            height="100%"
        // Background gradient for a modern touch
        >
            {/* Hero Section */}
            <Box width="100%" display="flex" flexDirection="column" alignItems="center" marginBottom="40px">
                <Typography variant="h1" color="primary.contrastText" style={{ fontWeight: 600 }}>
                    Welcome to Supra Dev!
                </Typography>
                <Typography variant="subtitle1" color="primary.contrastText" style={{ marginTop: "15px" }}>
                    Bridging the Gap Between Creativity and Collaboration
                </Typography>
            </Box>
            <Grid container spacing={4} width="80%">
                {/* Announcements */}
                <Grid item xs={12} sm={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>Announcements</Typography>
                            <Typography variant="h6" color="primary" mb="10px">Top Bounty: Project X</Typography>
                            <Typography variant="h6" color="primary" mb="10px">Project T has been finalized and deployed into...</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Highlights */}
                <Grid item xs={12} sm={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>Highlights</Typography>
                            <Typography variant="h6" color="primary" mb="10px">Success! Project J made major breakthroughs in XYZ</Typography>
                            <Typography variant="h6" color="primary" mb="10px">Supra Coder Snuffy figured out how to install DOOM in My...</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Latest Notifications */}
                <Grid item xs={12}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Latest Notifications</Typography>
                            {/* Example Notification */}
                            <Typography variant="subtitle1" color="textSecondary" mb="10px">You have 3 new project invitations!</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* User Activity */}
                <Grid item xs={12}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Recent Activity</Typography>
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
export default HomePage;