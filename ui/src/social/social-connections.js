import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Box, Card } from '@mui/material/';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

import { SocialConnection } from './social-connection';
import { useCookies, CookiesProvider } from 'react-cookie';

export const SocialConnections = (props) => {
  const { connections = [], query = '', onQueryChange, ...other } = props;
  const { id } = useParams();
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies([
    'username_token',
    'user_id_token',
    'userPriv_Token',
  ]);

  // Function to get the ID based on URL or sessionCookies
  const getViewedId = () => {
    return id ? id : sessionCookies.user_id_token;
  };

  const viewedId = getViewedId();
  const otherUsers = connections.filter((connection) => connection.id !== viewedId);

  return (
    <Card {...other}>
      <CardHeader title="Connections" />
      <Divider />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {otherUsers.slice(1).map((connection) => (
            <Grid key={connection.id} xs={12} md={6}>
              <SocialConnection connection={connection} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

SocialConnections.propTypes = {
  connections: PropTypes.array,
  query: PropTypes.string,
  onQueryChange: PropTypes.func,
};
