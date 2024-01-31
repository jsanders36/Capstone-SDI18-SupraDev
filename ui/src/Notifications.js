import React from 'react';
import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';

const Notification = ({ project, username, submitter, submitterImg, acceptedImg, submittedUserId, acceptedUserId }) => (
  <Box display="flex" alignItems="center" mb={1}>
        <Stack
            alignItems="center"
            direction="row"
            spacing={2}
        >
        {project.is_competed || project.is_accepted ? (
          <a href={`http://localhost:3000/supracoders/${acceptedUserId}`}>
            <Avatar src={acceptedImg} alt="User Avatar" style={{ float: 'left', outlineWidth: '30px', outlineColor: 'red', width: '40px', height: '40px' }} />
          </a>
        ) : (
          <a href={`http://localhost:3000/users/${submittedUserId}`}>
            <Avatar src={submitterImg} alt="User Avatar" style={{ float: 'left', outlineWidth: '3px', outlineColor: 'red', width: '40px', height: '40px' }} />
          </a>
        )}

      <div>
        <Typography>
          {project.is_completed
            ? `${project.name} project has been completed by ${username}`
            : project.is_accepted
            ? `${project.name} project has been accepted by ${username}`
            : `${project.name} project has been created by ${submitter}`}
        </Typography>
            </div>

      </Stack>
  </Box>
);

export default Notification;

//  {project.is_completed} ? `${allUsers.username} Just Completed ${project.name}` : project.is_accepted ? 'Accepted' : 'Unaccepted'