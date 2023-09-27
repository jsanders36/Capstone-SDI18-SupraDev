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
    const [defProfilePic, setDefProfilePic] = useState('https://as1.ftcdn.net/v2/jpg/02/85/15/18/1000_F_285151855_XaVw4eFq1QufklRbMFDxdAJos1OadAD1.jpg');
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
                if (element.password === SHA256(passwordLogin).toString()) {
                    removeSessionCookies('user_id_token');
                    removeSessionCookies('username_token');
                    setSessionCookies('user_id_token', element.id, { path: '/' });
                    setSessionCookies('username_token', element.username, { path: '/' });
                    setSessionCookies('userPriv_Token', element.is_supracoder, { path: '/' })
                    navigate('/home');
                    window.location.reload();
                    setUsernameLogin('');
                    setPasswordLogin('');
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

    const CreateAccount = async () => {
        let profPicToSet = '';
        if (profilePic === '') {
            profPicToSet = defProfilePic
        } else {
            profPicToSet = profilePic
        }
        await fetch('http://localhost:8080/users', {
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
                "profile_pic": profPicToSet,
                "is_supracoder": false
            })
        })
        window.location.reload();
        alert("Account Created!")
        usersRefetch();
    }

    return (
        <>
            <Paper
                elevation={0}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(255,255,255, 0)',
                    margin: '0 auto',
                    padding: '20px',
                    maxWidth: '920px',
                }}
            >
                <Card
                    sx={{
                        width: ['90%', '70%', '60%'],
                        m: 2,
                        padding: 2,
                        textAlign: 'center',
                        borderRadius: '25px',
                        background: 'rgba(255,255,255, 0.9)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    id='loginContainer'
                >
                    <h3>Login</h3>
                    <form id='loginCreds'>
                        <TextField
                            fullWidth
                            className='inputText'
                            label='Username'
                            variant="outlined"
                            type='text'
                            value={usernameLogin}
                            onChange={(e) => setUsernameLogin(e.target.value)}
                            placeholder='Username'
                            size='small'
                            margin='normal'
                        />
                        <TextField
                            fullWidth
                            className='inputText'
                            label='Password'
                            variant="outlined"
                            type='password'
                            value={passwordLogin}
                            onChange={(e) => setPasswordLogin(e.target.value)}
                            placeholder='Password'
                            size='small'
                            margin='normal'
                        />
                        <Button
                            fullWidth
                            type='submit'
                            onClick={() => LogIntoAccount()}
                            variant='contained'
                            color='secondary'
                            style={{ marginTop: '15px' }}
                        >
                            Login
                        </Button>
                    </form>
                </Card>

                <Card
                    sx={{
                        width: ['90%', '70%', '60%'],
                        m: 2,
                        padding: 2,
                        textAlign: 'center',
                        borderRadius: '25px',
                        background: 'rgba(255,255,255, 0.9)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    id='createAccountContainer'
                >
                    <h3>Create Account</h3>
                    <div id='createAccountInputName'>
                        <TextField
                            fullWidth
                            className='inputText'
                            label='First Name'
                            variant="outlined"
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='First Name'
                            size='small'
                            margin='normal'
                        />
                        <TextField
                            fullWidth
                            className='inputText'
                            label='Last Name'
                            variant="outlined"
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Last Name'
                            size='small'
                            margin='normal'
                        />
                    </div>
                    <div id='createAccountUserCreds'>
                        <TextField
                            fullWidth
                            className='inputText'
                            label='Username'
                            variant="outlined"
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
                            size='small'
                            margin='normal'
                        />
                        <TextField
                            fullWidth
                            className='inputText'
                            label='Password'
                            variant="outlined"
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            size='small'
                            margin='normal'
                        />
                    </div>
                    <div id='createAccountPicNDesc'>
                        <TextField
                            fullWidth
                            className='inputText'
                            label='Profile Picture URL'
                            variant="outlined"
                            type='text'
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                            placeholder='Profile Picture URL'
                            size='small'
                            margin='normal'
                        />
                        <TextField
                            fullWidth
                            className='inputText'
                            label='User Description'
                            variant="outlined"
                            type='text'
                            multiline
                            rows={3}
                            value={userSummary}
                            onChange={(e) => setUserSummary(e.target.value)}
                            placeholder='User Description'
                            size='small'
                            margin='normal'
                        />
                    </div>
                    <Button
                        fullWidth
                        onClick={() => CreateAccount()}
                        variant='contained'
                        color='secondary'
                        style={{ marginTop: '15px' }}
                    >
                        Create Account
                    </Button>
                </Card>
            </Paper>
        </>
    );
}

export default Login;