import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Avatar } from '@mui/material';
import { useCookies, CookiesProvider } from 'react-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';

const NavbarConnect = () => {
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies([
    'username_token',
    'user_id_token',
    'userPriv_Token',
  ]);
  const [userObj, setUserObj] = useState([])

  const userRefetch = async () => {
    await fetch(`http://localhost:8080/users/${sessionCookies.user_id_token}`)
        .then((res) => res.json())
        .then((fetchData) => setUserObj(fetchData[0]))
  }

  const RectangularSpeedDialIcon = () => {
    userRefetch();
    return (
      <Avatar src={userObj.profile_pic} alt="User Avatar" style={{ float: 'right', outlineWidth: '1px', outlineColor: 'red', width: '60px', height: '60px' }} />
      // <div
      //   style={{
      //       width: '100px',
      //       height: '60px',
      //       backgroundColor: 'dark blue',
      //       display: 'flex',
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       borderRadius: '8px',
      //       borderColor: 'white',
      //       color: 'white',
      //       fontWeight: 'bold',
      //   }}
      // >
      //   Menu
      // </div>
    );
  };

  const [open, setOpen] = useState(false);

  const adminActions = [
    { icon: <HomeIcon />, name: 'Home', link: '/' },
    // { icon: <BuildIcon />, name: 'Projects', link: '/projects' },
    // { icon: <AssignmentIndIcon />, name: 'Requests', link: '/requests' },
    { icon: <AccountCircleIcon />, name: 'User Profile', link: `/users/` },
    { icon: <ExitToAppIcon />, name: 'Logout', onClick: handleLogout },
  ];

  const userActions = [
    { icon: <HomeIcon />, name: 'Home', link: '/' },
    // { icon: <BuildIcon />, name: 'Projects', link: '/projects' },
    // { icon: <AssignmentIndIcon />, name: 'Requests', link: '/requests' },
    { icon: <AccountCircleIcon />, name: 'User Profile', link: `/users/` },
    { icon: <ExitToAppIcon />, name: 'Logout', onClick: handleLogout },
  ];

  const loggedOutActions = [
    { icon: <HomeIcon />, name: 'Home', link: '/' },
    // { icon: <BuildIcon />, name: 'Projects', link: '/projects' },
    { icon: <ExitToAppIcon />, name: 'Login Page', link: '/login' },
  ];

  const isAdmin = sessionCookies.userPriv_Token === true;
  const isLoggedIn = sessionCookies.username_token;

  function handleLogout() {
    removeSessionCookies('username_token');
    removeSessionCookies('user_id_token');
    removeSessionCookies('userPriv_Token');
    alert('You have been logged out');
    window.location.href = '/login';
  }

  return (
<div id="navbar" style={{ position: 'fixed', top: 10, right: 20, zIndex: 1000 }}>
    <SpeedDial
      ariaLabel="SpeedDial"
      icon={<RectangularSpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      direction="down"
    >
      {isAdmin && isLoggedIn
        ? adminActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                if (action.onClick) {
                  action.onClick();
                }
              }}
              component={Link}
              to={action.link}
            />
          ))
        : isLoggedIn
        ? userActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                if (action.onClick) {
                  action.onClick();
                }
              }}
              component={Link}
              to={action.link}
            />
          ))
        : loggedOutActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                if (action.onClick) {
                  action.onClick();
                }
              }}
              component={Link}
              to={action.link}
            />
          ))}
    </SpeedDial>
  </div>
);
};

export default NavbarConnect;