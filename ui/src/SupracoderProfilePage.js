import './SupracoderProfilePage.css'

import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Box, Avatar, Divider, List, ListItem, ListItemText, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { SHA256 } from 'crypto-js';


const SupracoderProfilePage = () => {
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
    const [userObj, setUserObj] = useState([])
    const [projects, setProjects] = useState([])
    var numAcceptedProjs = 0;
    var numCompletedProjs = 0;
    var totalProjs = 0;
    var newPasswordDiv;
    const [changePassword, setChangePassword] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [editProfile, setEditProfile] = useState(false)
    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // const [jobTitle, setJobTitle] = useState('')
    // const [email, setEmail] = useState('')
    // const [description, setDescription] = useState('')
    // const [profilePic, setProfilePic] = useState('')
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newJobTitle, setNewJobTitle] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newProfilePic, setNewProfilePic] = useState('')
    const { id } = useParams();

    const userRefetch = async () => {
        await fetch(`http://localhost:8080/users/${id}`)
            .then((res) => res.json())
            .then((fetchData) => setUserObj(fetchData[0]))
    }

    const projectsRefetch = async () => {
        await fetch('http://localhost:8080/projects')
            .then((res) => res.json())
            .then((userFetchData) => setProjects(userFetchData))
    }

    useEffect(() => {
        userRefetch();
        projectsRefetch();
    },[])

    const calcBountyStats = () => {
        for (let element in projects) {
            console.log(projects[element])
            if (projects[element].accepted_by_id === userObj.id) {
                numAcceptedProjs ++;
                if (projects[element].is_completed === true) {
                    numCompletedProjs ++;
                }
            }
        }
        totalProjs = numAcceptedProjs;
    }

    const patchPassword = () => {
        fetch(`http://localhost:8080/users/${sessionCookies.user_id_token}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "password": SHA256(newPassword).toString()
            })

        })
        setChangePassword(false)
        alert('Password successfully changed!')
    }

    const patchProfile = async () => {
        await fetch(`http://localhost:8080/users/${sessionCookies.user_id_token}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "first_name": newFirstName,
                "last_name": newLastName,
                "job_title": newJobTitle,
                "email": newEmail,
                "user_summary": newDescription,
                "profile_pic": newProfilePic
            })
        })
        .then(() => userRefetch())
        .then(() => {
            setEditProfile(false);
            // window.location.reload();
        })

    }

    const ChangePasswordComponent = () => {
        if (changePassword === true) {
            return(
                <Card variant="outlined" style={{width: '400px'}}>
                    <p><TextField variant="outlined" onChange={(e) => setNewPassword(e.target.value)} label="New Password" type="text" size="small"  style={{ margin: '5px' }}></TextField></p>
                    <p><Button variant="contained" color="secondary" onClick={() => patchPassword()}  style={{ margin: '5px' }}>Submit</Button>
                    <Button variant="contained" color="error" onClick={() => setChangePassword(false)}  style={{ margin: '5px' }}>Cancel</Button></p>
                </Card>
            )
        } else {
            return(<></>)
        }
    }
    const profileSettingsRender = () => {
        if (parseInt(id) === sessionCookies.user_id_token) {
            return (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Profile Settings</Typography>
                        <Button onClick={() => {
                            setNewFirstName(userObj.first_name)
                            setNewLastName(userObj.last_name)
                            setNewJobTitle(userObj.job_title)
                            setNewEmail(userObj.email)
                            setNewDescription(userObj.user_summary)
                            setNewProfilePic(userObj.profile_pic)
                            setEditProfile(true)}
                            } variant="contained" color="primary" style={{ width: "90%", margin: '5px 0' }}>
                            Edit Profile
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setChangePassword(true)} style={{ width: "90%", margin: '5px 0' }}>
                            Change Password
                        </Button>
                    </CardContent>
                </Card>
            )
        } else {
            return (<></>)
        }
    }
    const personalInfoRender = () => {
        if (editProfile === false) {
            return (
                <div style={{display: 'flex'}}>
                    <div>
                        <Typography variant="subtitle1">{userObj.first_name} {userObj.last_name}</Typography>
                        <Typography variant="subtitle1">Job Title: {userObj.job_title}</Typography>
                        <Typography variant="subtitle1">Email: {userObj.email}</Typography>
                        <Typography variant="body1">Description: {userObj.user_summary}</Typography>
                    </div>
                </div>
            )
        } else if (editProfile === true) {

            return (
                <>
                    <p><TextField id="newFirstName" variant="standard" placeholder={userObj.first_name} value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} style={{ margin: '2px' }} label="First Name" />
                    <TextField id="newLastName" variant="standard" placeholder={userObj.last_name} value={newLastName} onChange={(e) => setNewLastName(e.target.value)} style={{ margin: '2px' }} label="Last Name" />
                    <TextField id="newProfilePic" variant="standard" placeholder={userObj.profile_pic} value={newProfilePic} onChange={(e) => setNewProfilePic(e.target.value)} style={{ width: '250px', margin: '2px' }} label="Image URL"/></p>

                    <p><TextField id="newJobTitle" variant="standard" placeholder={userObj.job_title} value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)}style={{ margin: '2px' }} label="Job Title"/>
                    <TextField id="newEmail" variant="standard" placeholder={userObj.email} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ margin: '2px' }} label="Email"/></p>
                    <p><TextField id="newDescription" variant="standard" placeholder={userObj.user_summary} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} multiline rows={2} style={{ width: '250px', margin: '2px' }} label="Description"/></p>

                    <p><Button onClick={() => patchProfile()} variant="contained" color="primary" size='small' style={{ margin: '5px' }}>Submit</Button>
                    <Button onClick={() => setEditProfile(false)} variant="contained" color="error" size='small' style={{ margin: '5px' }}>Cancel</Button></p>
                </>
            )
        }
    }

    if(userObj.is_supracoder === true) {
        return (
            <Box display="flex" padding="20px" height="100vh" bgcolor="rgba(255, 255, 255, .85)" sx={{borderRadius: '25px', marginTop: "25px", marginLeft: "50px", marginRight: "50px", marginBottom: "50px"}}>

                {/* Side Navigation */}
                <Box display="flex" flexDirection="column" gap="20px" width="250px" pr="20px">
                    <Typography variant="h5" color="primary" mb="20px" sx={{ textAlign: 'center' }}>{`${userObj.first_name}`}'s Profile</Typography>

                    {/* <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Projects</Typography>
                            <Button component={Link} to="/profile/projects/new" variant="contained" color="primary" style={{ width: "90%", margin: '5px 0' }}>
                                Add New Project
                            </Button>
                            <Button component={Link} to="/profile/projects/edit" variant="contained" color="secondary" style={{ width: "90%", margin: '5px 0' }}>
                                Edit Project
                            </Button>
                        </CardContent>
                    </Card> */}

                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bounties</Typography>
                            {/* <Button component={Link} to={`/supracoders/${id}/bounties`} variant="contained" color="primary" style={{ width: "90%", margin: '5px 0' }}>
                                View Claimed Bounties
                            </Button> */}
                            <Button component={Link} to={`/supracoders/${id}/bounties`} variant="contained" color="secondary" style={{ width: "90%", margin: '5px 0' }}>
                                View Bounties
                            </Button>
                        </CardContent>
                    </Card>
                    {profileSettingsRender()}
                </Box>

                <Divider orientation="vertical" flexItem />

                {/* Main Content Area */}
                <Box flex={1} pl="20px">

                    {/* User Avatar & Details */}
                    <Box display="flex" alignItems="center" gap="20px" mb="30px" style={{position: 'relative'}}>
                        <Avatar src={userObj.profile_pic} alt="User Avatar" style={{ width: '150px', height: '150px' }} />
                        <h2 style={{position: 'absolute', top: '0', right: '0', display: 'flex', marginLeft: '100px', float: 'right'}}>
                            <p>Earned Doubloons:</p><img src='https://github.com/jsanders36/Capstone-SDI18-SupraDev/blob/main/ui/public/supradoubloon.png?raw=true' style={{marginTop: '27px', marginLeft: '25px', marginRight: '7px'}} alt='supradoubloons' height='30px' width='30px'/><p style={{color: 'blue'}}>{userObj.supradoubloons}</p>
                        </h2>
                        <Box>
                            {console.log(userObj.username)}
                            <Typography variant="h5" gutterBottom>{userObj.username}</Typography>
                            {personalInfoRender()}
                        </Box>
                    </Box>

                    {/* User Statistics */}
                    {calcBountyStats()}
                    {newPasswordDiv}
                    <Box display="flex" gap="20px" mb="30px">
                        <Card variant="outlined" style={{ flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6">Total Projects</Typography>
                                <Typography variant="h4" color="primary">{totalProjs}</Typography>
                            </CardContent>
                        </Card>

                        <Card variant="outlined" style={{ flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6">Bounties Claimed</Typography>
                                <Typography variant="h4" color="secondary">{numAcceptedProjs}</Typography>
                            </CardContent>
                        </Card>

                        <Card variant="outlined" style={{ flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6">Bounties Completed</Typography>
                                <Typography variant="h4" color="primary">{numCompletedProjs}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    {/* Latest Notifications */}
                    <Box mb="30px">
                    {ChangePasswordComponent()}
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
    } else {
        return (
            <p>Sorry, chief, this person ain't a coder</p>
        )
    }
}

export default SupracoderProfilePage;
