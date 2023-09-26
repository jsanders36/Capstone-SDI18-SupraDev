import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/system';


const Notification = ({ project, username }) => (
    <>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body2">
            Status:  {project.is_completed ? `${username} Just Completed ${project.name}` : project.is_accepted ? 'Accepted' : 'Unaccepted'}
        </Typography>
        <Typography variant="body2">
            {username ? `By ${username}` : ''}
        </Typography>
    </>
);

Notification.propTypes = {
    project: PropTypes.object.isRequired,
    username: PropTypes.string,
};

export default Notification;

//  {project.is_completed} ? `${allUsers.username} Just Completed ${project.name}` : project.is_accepted ? 'Accepted' : 'Unaccepted'