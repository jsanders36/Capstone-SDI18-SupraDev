import React from 'react';
import { Button, Card, CardContent, Typography, Box, Avatar, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    return (
        <Box display="flex" padding="20px" height="100vh" bgcolor="#f5f5f5">

            {/* Side Navigation */}
            <Box display="flex" flexDirection="column" gap="20px" width="250px" pr="20px">
                <Typography variant="h5" color="primary" mb="20px">Profile Navigation</Typography>

                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Projects</Typography>
                        <Button component={Link} to="/profile/projects/new" variant="contained" color="primary" style={{ margin: '5px 0' }}>
                            Add New Project
                        </Button>
                        <Button component={Link} to="/profile/projects/edit" variant="contained" color="secondary">
                            Edit Project
                        </Button>
                    </CardContent>
                </Card>

                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bounties</Typography>
                        <Button component={Link} to="/profile/bounties/claimed" variant="contained" color="primary" style={{ margin: '5px 0' }}>
                            View Claimed Bounties
                        </Button>
                        <Button component={Link} to="/profile/bounties/completed" variant="contained" color="secondary">
                            View Completed Bounties
                        </Button>
                    </CardContent>
                </Card>

                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Profile Settings</Typography>
                        <Button component={Link} to="/profile/edit" variant="contained" color="primary" style={{ margin: '5px 0' }}>
                            Edit Profile
                        </Button>
                        <Button component={Link} to="/profile/view" variant="contained" color="secondary">
                            View Public Profile
                        </Button>
                    </CardContent>
                </Card>

            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Main Content Area */}
            <Box flex={1} pl="20px">

                {/* User Avatar & Details */}
                <Box display="flex" alignItems="center" gap="20px" mb="30px">
                    <Avatar src="/path/to/user/image.jpg" alt="User Avatar" style={{ width: '100px', height: '100px' }} />
                    <Box>
                        <Typography variant="h5" gutterBottom>Username</Typography>
                        <Typography variant="subtitle1">User@email.com</Typography>
                        <Typography variant="body1">Other user details...</Typography>
                    </Box>
                </Box>

                {/* User Statistics */}
                <Box display="flex" gap="20px" mb="30px">
                    <Card variant="outlined" style={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6">Total Projects</Typography>
                            <Typography variant="h4" color="primary">24</Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" style={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6">Bounties Claimed</Typography>
                            <Typography variant="h4" color="secondary">12</Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" style={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6">Bounties Completed</Typography>
                            <Typography variant="h4" color="primary">5</Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Latest Notifications */}
                <Box mb="30px">
                    <Typography variant="h6" mb="20px">Latest Notifications</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Notification 1: Someone claimed your bounty." secondary="2 hours ago" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Notification 2: Your project has been approved." secondary="5 hours ago" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Notification 3: A new message from John Doe." secondary="1 day ago" />
                        </ListItem>
                    </List>
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

export default ProfilePage;
