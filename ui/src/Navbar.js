//import './Navbar.css';

import React, { useEffect, useState } from 'react';
import { Button, Avatar } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import NavbarConnect from './NavbarConnect';


const Navbar = () => {
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState([])

    let loginButton;
    let logoutButton;
    let currentUserInfo;
    let profileButton;
    let requestsButton;
    let navConnect;

    const userRefetch = async () => {
        await fetch(`http://localhost:8080/users/${sessionCookies.user_id_token}`)
            .then((res) => res.json())
            .then((fetchData) => setUserObj(fetchData[0]))
    }

    useEffect(() => {
        userRefetch();
    }, [sessionCookies.username_token])

    if (sessionCookies.username_token === undefined) {
        loginButton = <Button className="button" onClick={() => navigate('/login')} variant='outlined' color='secondary' style={{ textAlign: 'center', gap: '10px', margin: '10px', backgroundColor: 'transparent', color: "#ffffff", borderColor: "#ffffff" }}>Login Page</Button>;
        navConnect = <></>
    } else {
        loginButton = <></>
        navConnect = <NavbarConnect />
    }



    if (sessionCookies.username_token) {
        // userRefetch();
        logoutButton = <Button onClick={() => { removeSessionCookies('username_token'); removeSessionCookies('user_id_token'); removeSessionCookies('userPriv_Token'); alert('You have been logged out'); navigate('/login') }} variant='outlined' color='error' style={{ textAlign: 'center', gap: '10px', margin: '10px', backgroundColor: 'transparent', color: "red", borderColor: "red" }}>Logout</Button>;
        currentUserInfo = <Avatar src={userObj.profile_pic} alt="User Avatar" style={{ float: 'right', outlineWidth: '1px', outlineColor: 'red', width: '50px', height: '50px' }} />

        // <Button style={{ marginLeft: '50%', marginTop: '10px', marginBottom: '10px', outlineWidth: '1px', backgroundColor: 'rgb(255, 255, 255, 0)' }}>
        // <Avatar src={userObj.profile_pic} alt="User Avatar" style={{ outlineWidth: '1px', outlineColor: 'red', width: '50px', height: '50px' }} />
        {/* <svg xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="blue">
                <path
                    d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                    stroke="grey"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg> */}
        {/* {`${sessionCookies.username_token} `} */ }
        // </Button>
        requestsButton = <Button onClick={() => navigate('/requests')} variant='outlined' color='secondary' style={{ textAlign: 'center', gap: '10px', margin: '10px', backgroundColor: 'transparent', color: "#ffffff", borderColor: "#ffffff" }}>Submit Request</Button>;
        if (sessionCookies.userPriv_Token === true) {

            profileButton = <Button onClick={() => navigate(`/supracoders/${sessionCookies.user_id_token}`)} variant='outlined' color='secondary' style={{ textAlign: 'center', gap: '10px', marginLeft: '10px', marginTop: '10px', marginBottom: '10px', marginRight: 'auto', backgroundColor: 'transparent', color: "#ffffff", borderColor: "#ffffff" }}>Admin Dashboard</Button>
        } else {
            profileButton = <Button onClick={() => navigate(`/users/`)} variant='outlined' color='secondary' style={{ textAlign: 'center', gap: '10px', marginLeft: '10px', marginTop: '10px', marginBottom: '10px', marginRight: 'auto', backgroundColor: 'transparent', color: "#ffffff", borderColor: "#ffffff" }}>User Page</Button>
        }
    }

    return (
        <div id='navbar' style={{ display: 'flex', backgroundColor: 'transparent', padding: '10px' }}>
            <Button className="button" onClick={() => navigate('/home')} variant='outlined' color='primary' style={{ textAlign: 'center', gap: '10px', margin: '10px', backgroundColor: 'transparent', color: "#ffffff", borderColor: "#ffffff" }}>Home</Button>
            <Button className="button" onClick={() => navigate('/projects')} variant='outlined' color='secondary' style={{ textAlign: 'center', gap: '10px', margin: '10px', backgroundColor: 'transparent', color: "#ffffff", borderColor: "#ffffff" }}>Projects</Button>
            {requestsButton}
            {profileButton}
            {loginButton}
            {/* {logoutButton} */}
            {/* {currentUserInfo} */}
            {navConnect}
        </div>
    )
}

export default Navbar;