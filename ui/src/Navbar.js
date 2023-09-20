import './Navbar.css';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useCookies, CookiesProvider } from 'react-cookie';

const Navbar = () => {
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])

    let logoutButton;
    let currentUserInfo;
    let profileButton;
    let requestsButton;

    if (sessionCookies.username_token) {
        logoutButton = <Button as={Link} onClick={() => { removeSessionCookies('username_token'); removeSessionCookies('user_id_token'); alert('You have been logged out') }} to='/login' variant='contained' color='error' style={{ gap: '10px', margin: '10px' }}>Logout</Button>;
        currentUserInfo = <Button style={{ marginLeft: '50%', marginTop: '3px', outlineStyle: 'solid', outlineColor: 'black', outlineWidth: '1px', backgroundColor: 'rgb(255, 255, 255)' }}>
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="blue">
                <path
                    d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                    stroke="grey"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            {`${sessionCookies.username_token} `}
        </Button>
        requestsButton = <Button as={Link} to='/requests' variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>Requests</Button>;
        if (sessionCookies.userPriv_Token === true) {
            profileButton = <Button as={Link} to={`/users/${sessionCookies.user_id_token}`} variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>Admin Page</Button>
        } else {
            profileButton = <Button as={Link} to='/user-profile' variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>User Page</Button>
        }
    }

    return (
        <div id='navbar' style={{ display: 'flex' }}>
            <Button as={Link} to='/' variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>Home</Button>
            <Button as={Link} to='/projects' variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>Projects</Button>
            {requestsButton}
            <Button as={Link} to='/login' variant='contained' color='secondary' style={{ gap: '10px', margin: '10px' }}>Login Page</Button>
            {profileButton}
            {logoutButton}
            {currentUserInfo}
        </div>
    )
}

export default Navbar;