import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import { SHA256 } from 'crypto-js';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userSummary, setUserSummary] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [usersSummary, setUsersSummary] = useState([])
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token'])
    const navigate = useNavigate();

    useEffect(() => {
        usersRefetch();
    }, [])

    const usersRefetch = async () => {
        await fetch('http://localhost:8080/users')
            .then((res) => res.json())
            .then((userFetchData) => setUsersSummary(userFetchData))
    }

    const LogIntoAccount = async () => {
        let accountMatch = false;
        for (var element of usersSummary) {
            console.log(element)
            if (element.username === usernameLogin) {
                accountMatch = true;
                if(element.password === SHA256(passwordLogin).toString()) {
                    removeSessionCookies('user_id_token');
                    removeSessionCookies('username_token');
                    setSessionCookies('user_id_token', element.id, { path: '/'});
                    setSessionCookies('username_token', element.username, { path: '/'});
                    navigate('/home');
                    window.location.reload();
                    alert(`Login successful for ${element.first_name} ${element.last_name}.`)
                    break
                } else {
                    alert(`Incorrect password for ${element.first_name} ${element.last_name}.`)
                    break
                }
            }
        }
        if (accountMatch === false) { alert('No account found for that username') }
    }

    const CreateAccount = () => {
        fetch('http://localhost:8080/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "username": username,
                "password": SHA256(password).toString(),
                "user_summary": userSummary,
                "profile_pic": profilePic
            })
        })
        alert("Account Created!")
        usersRefetch();
    }

    return (
        <>
            <Paper elevation={3} style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', backgroundColor: 'pink', maxWidth: '920px', marginLeft: '25%', padding: '4px' }}>
                <Card sx={{
                    minWidth: 400,
                    maxWidth: 512,
                    m: 2,
                    marginLeft: '20%',
                    padding: 1,
                    textAlign: 'left'
                }} id='loginContainer'>
                    <h3>Login</h3>
                    <form id='loginCreds'>
                        <TextField className='inputText' label='Username' variant="outlined" type='text' value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} placeholder='Username' size='small' style={{ gap: '10px', margin: '10px' }} />
                        <TextField className='inputText' label='Password' variant="outlined" type='text' value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} placeholder='Password' size='small' style={{ gap: '10px', margin: '10px' }} />
                    </form>
                    <Button type='submit' onClick={() => LogIntoAccount()} variant='contained' color='success' style={{ gap: '10px', margin: '10px' }}>Login</Button>
                </Card>

                <Card sx={{
                    minWidth: 400,
                    maxWidth: 512,
                    m: 2,
                    marginLeft: '20%',
                    padding: 1,
                    textAlign: 'left'
                }} id='createAccountContainer'>
                    <h3>Don't have an account? Create one below!</h3>
                    <div id='createAccountInputName'>
                        <TextField className='inputText' label='First Name' variant="outlined" type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' size='small' style={{ gap: '10px', margin: '10px' }} />
                        <TextField className='inputText' label='Last Name' variant="outlined" type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' size='small' style={{ gap: '10px', margin: '10px' }} />
                    </div>
                    <div id='createAccountUserCreds'>
                        <TextField className='inputText' label='Username' variant="outlined" type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' size='small' style={{ gap: '10px', margin: '10px' }} />
                        <TextField className='inputText' label='Password' variant="outlined" type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' size='small' style={{ gap: '10px', margin: '10px' }} />
                    </div>
                    <div id='createAccountPicNDesc'>
                        <TextField className='inputText' label='Profile Picture URL' variant="outlined" type='text' value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder='Profile Picture URL' size='small' style={{ gap: '10px', margin: '10px' }} />
                        <TextField className='inputText' label='User Description' variant="outlined" type='text' multiline rows={3} value={userSummary} onChange={(e) => setUserSummary(e.target.value)} placeholder='User Description' size='small' style={{ gap: '10px', margin: '10px' }} />
                    </div>
                    <Button onClick={() => CreateAccount()} variant='contained' color='success' style={{ gap: '10px', margin: '10px' }}>Create Account</Button>
                </Card>
            </Paper>
        </>
    )

}



export default Login;