import React from 'react';
import { Button, Card, CardContent, Typography, Box, Avatar, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Box display="flex" padding="20px" height="100vh" bgcolor="#f5f5f5">
            <Divider orientation="vertical" flexItem />

            {/* Main Content Area */}

            <Box flex={1} pl="20px" >

                <Box display="flex" gap="20px" mb="30px" >

                    <Card variant="outlined" style={{ flex: 1 }} >

                        <CardContent>
                            {/* Announcements */}
                            <Typography variant="h4" sx={{textAlign: "center"}}>Announcements</Typography>
                            <Typography variant="h5" color="primary" sx={{textAlign: "center"}}>Top Bounty: Project X</Typography>
                            <Typography variant="h5" color="primary" sx={{textAlign: "center"}}>Project T has been finalized and deployed into...</Typography>
                            <p></p>

                            {/* Highlights */}
                            <Typography variant="h4" sx={{textAlign: "center"}}>Highlights</Typography>
                            <Typography variant="h5" color="primary" sx={{textAlign: "center"}}>Success! Project J made major breakthroughs in XYZ</Typography>
                            <Typography variant="h5" color="primary" sx={{textAlign: "center"}}>Supra Coder Snuffy figured out how to install DOOM in My...</Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Latest Notifications */}
                <Box mb="30px">
                    <Typography variant="h6" mb="20px">Latest Notifications</Typography>

                </Box>

                {/* User Activity */}
                <Box>
                    <Typography variant="h6" mb="20px">Recent Activity</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Added a new project: Project XYZ." secondary="1 day ago" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Claimed a bounty from John's project." secondary="2 days ago" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Updated profile information." secondary="3 days ago" />
                        </ListItem>
                    </List>
                </Box>

            </Box>
        </Box>
    );
}

export default HomePage;
