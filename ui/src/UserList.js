import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, Box, Card, Avatar } from "@mui/material";
import { useCookies } from 'react-cookie';
import { styled, useTheme } from '@mui/system';
import { motion } from 'framer-motion';

const UserList = (props) => {
  const { profile, ...other } = props;
  const [users, setUsers] = useState([]);
  const maxLength = 22;
  const [filterVar, setFilterVar] = useState([]);
  const navigate = useNavigate();
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token']);
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/users')
    .then((res) => res.json())
    .then((projectsData) => setAllUsers(projectsData))
      .catch((err) => console.log(err));
  }, []);


  const findSubmitter = (assocSubId) => {
    let outputUsername;
    let outputUserImg;
    for (let element in allUsers) {
      if (allUsers[element].id === assocSubId) {
        outputUsername = allUsers[element].username;
        outputUserImg = allUsers[element].profile_pic;
        return (
          <div style={{ display: 'flex', position: 'absolute', bottom: '0' }}>
            <p style={{ marginBottom: 'auto', textAlign: 'left' }}><Avatar src={outputUserImg} alt="User Avatar" style={{ float: 'left', outlineWidth: '1px', outlineColor: 'red', width: '40px', height: '40px' }} /></p>
            <p style={{ marginLeft: '5px', marginTop: '22px' }}>{outputUsername}</p>
          </div>
        )
      }
    }
  }

  const HoverCard = styled(motion(Card))({
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    },
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  });

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }


  const cardStyle = {
    position: 'relative',
    height: 220,
    width: '25%',
    margin: 8,
    padding: 8,
    textAlign: 'center',
    borderRadius: "15px",
    background: "rgba(255,255,255, 0.85)",
    cursor: "pointer"
  };



  return (

    <div>
      <p>  </p>

      <Box
        padding="20px"
        height="90%"
        style={{
          marginTop: "25px",
          marginLeft: "50px",
          marginRight: "50px",
          marginBottom: "50px",
          backgroundColor: "rgba(255,255,255, 0.85)",
          borderRadius: "25px",
          //background: "rgba(255,255,255, 0.85)"
        }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          {" "}
          User List{" "}
        </Typography>

      </Box>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
        }}>
        {allUsers.map((user) => (
          <HoverCard
            style={cardStyle}
            key={user.id}>
            <div key={user.id} style={{ textAlign: "center", marginBottom:'auto' }}>
              <h2>{user.username}</h2>

              <h3> { user.is_supracoder ? "Supra Coder!" : <></> }</h3>
            </div>
            {findSubmitter(user.id)}
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

UserList.propTypes = {
  projects: PropTypes.array,
  outputUsername: PropTypes.array
  // profile: PropTypes.object.isRequired,
};

export default UserList;