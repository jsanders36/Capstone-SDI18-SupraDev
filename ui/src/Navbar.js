import './Navbar.css';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useCookies, CookiesProvider } from 'react-cookie';

const Navbar = () => {
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token'])
    console.log('cookies:', sessionCookies)

    let logoutButton;
    let currentUserInfo;

    if(sessionCookies.username_token) {
        logoutButton = <Button as={Link} onClick={() => { removeSessionCookies('username_token'); removeSessionCookies('user_id_token'); alert('You have been logged out') }} to='/login' variant='contained' color='error' style={{gap: '10px', margin: '10px'}}>Logout</Button>;
        currentUserInfo = <p style={{marginLeft: '20%', outlineStyle: 'solid', outlineColor: 'black', outlineWidth: '1px', backgroundColor: 'rgb(255, 0, 255)'}}> Current User: {`${sessionCookies.username_token} `} </p>
    }

    return (
        <div id='navbar' style={{display: 'flex'}}>
            <Button as={Link} to='/' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Home</Button>
            <Button as={Link} to='/projects' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Projects</Button>
            <Button as={Link} to='/requests' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Requests</Button>
            <Button as={Link} to='/login' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Login Page</Button>
            {logoutButton}
            {currentUserInfo}
        </div>
    )
}

export default Navbar;