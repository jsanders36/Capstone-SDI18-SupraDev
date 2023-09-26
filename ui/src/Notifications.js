import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/system';


const Notification = ({ project, username, submitter, submitterImg, acceptedImg, submittedUserId, acceptedUserId}) => (
    <>
        <Typography variant="h6">
            <p style={{ marginBottom: 'auto', textAlign: 'left' }}>
                {project.is_competed || project.is_accepted ?
                    <a href={`http://localhost:3000/supracoders/${acceptedUserId}`}>
                        <Avatar src={acceptedImg} alt="User Avatar" style={{ float: 'left', outlineWidth: '1px', outlineColor: 'red', width: '40px', height: '40px' }} />
                    </a>
                    :
                    <a href={`http://localhost:3000/users/${submittedUserId}`}>
                        <Avatar src={submitterImg} alt="User Avatar" style={{ float: 'left', outlineWidth: '1px', outlineColor: 'red', width: '40px', height: '40px' }} />
                    </a>
                }
            </p>
                {project.is_completed ? `${project.name} project has been completed by ${username}` : project.is_accepted ? `${project.name} project has been accepted by ${username}` : `${project.name} project has been created by ${submitter}`}
        </Typography>
    </>
);


export default Notification;

//  {project.is_completed} ? `${allUsers.username} Just Completed ${project.name}` : project.is_accepted ? 'Accepted' : 'Unaccepted'