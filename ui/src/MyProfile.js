import React, { useCallback, useEffect, useState } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import MessageChatSquareIcon from './icons/message-chat-square';
import DotsHorizontalIcon from './icons/dots-horizontal';
import Image03Icon from './icons/image-03';
// import UserPlus02Icon from './icons/user-plus-02';
import Edit from './icons/edit';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';
import { useTheme } from '@mui/system';
import { motion } from 'framer-motion';


import EditProfileForm from './EditProfileForm';
import { socialApi } from './social/index.js';
import { RouterLink } from './components/router-link';
// import { Seo } from './components/seo';
import { useMounted } from './hooks/use-mounted';
import { usePageView } from './hooks/use-page-view';
import { Layout as DashboardLayout } from './layouts/layout.js';
import { paths } from './paths';
import { SocialConnections } from './social/social-connections';
import { SocialTimeline } from './social/social-timeline';
// import Projects from './Projects'
import UsersProjects from './UsersProjects';
// import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';

const tabs = [
  { label: 'Timeline', value: 'timeline' },
  { label: 'Connections', value: 'connections' },
  { label: 'My Projects', value:'projects'}
];

const useProfile = () => {
  const isMounted = useMounted();
  const [profile, setProfile] = useState(null);

  const handleProfileGet = useCallback(async () => {
    try {
      const response = await socialApi.getProfile();

      if (isMounted()) {
        setProfile(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleProfileGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return profile;
};

const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await socialApi.getPosts();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handlePostsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return posts;
};

const useUsers = (search = '') => {
  const [users, setUsers] = useState([]);
  const isMounted = useMounted();

  const handleUsersGet = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/users');

      if (isMounted()) {
        const userData = await response.json();
        setUsers(userData);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleUsersGet();
  }, [handleUsersGet]);

  return users.filter((connection) => {
        return connection.first_name?.toLowerCase().includes(search);
      });

};


const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const isMounted = useMounted();


  const handleProjectsGet = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/projects');

      if (isMounted()) {
        setProjects(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleProjectsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return projects;
};

const GenUser = () => {
  const profile = useProfile();
  const [currentTab, setCurrentTab] = useState('timeline');
  const [status, setStatus] = useState('not_connected');
  const posts = usePosts();
  const projects = useProjects();
  const [usersQuery, setUsersQuery] = useState('');
  const [fetchTime, setFetchTime] = useState(false);
  const users = useUsers(usersQuery);
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
  const [userObj, setUserObj] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [openEditModal, setOpenEditModal] = useState(false);
  const theme = useTheme();
  const primaryMainColor = theme?.palette?.primary?.main || '#000';
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
};
  const userRefetch = async () => {
    setFetchTime(false);
    await fetch(`http://localhost:8080/users/${sessionCookies.user_id_token}`)
        .then((res) => res.json())
      .then((fetchData) => setUserObj(fetchData[0]))
    setFetchTime(true);
    handleTabsChange(currentTab, 'timeline')
  }

  const handleEditProfileClick = () => {
    setOpenEditModal(true);
  };

  const handleUpdateProfile = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${sessionCookies.user_id_token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (response.status === 200) {
        userRefetch();
        navigate.push(`./${sessionCookies.user_id_token}`);
        handleTabsChange(currentTab, 'timeline')
        window.location.reload();
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setOpenEditModal(false);
  };



  const usersFetch = async () => {
    setFetchTime(true);
    await fetch(`http://localhost:8080/users`)
        .then((res) => res.json())
      .then((userfetchData) => setUsersArr(userfetchData))
    setFetchTime(false);
  }

useEffect(() => {
  userRefetch();
  usersFetch();

},[])

  usePageView();



  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  const handleUsersQueryChange = useCallback((event) => {
    setUsersQuery(event.target.value);
  }, []);


  if (!profile) {
    return null;
  }

  return (
    <>
      {isEditing ? (
        <EditProfileForm
          user={userObj}
          onSubmit={handleUpdateProfile}
          onCancel={handleCancelEdit}
        />
      ) : (
      <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={variants}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
          backgroundImage: 'url(/path-to-your-background-image)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '.heroSection': {
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              color: primaryMainColor,
          },
          '.card': {
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(5px)',
          },
            }}>
            <Box  display="flex" padding="20px" height="200%" bgcolor="rgba(255, 255, 255, .85)" sx={{backgroundSize: 'cover', borderRadius: '25px', marginTop: "25px", marginLeft: "50px", marginRight: "50px", marginBottom: "50px" }}>
        <Container maxWidth="lg">
          <div>
            {/* <Box
              style={{ backgroundImage: `url(${profile.cover})` }}
              sx={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: '25px',
                height: 348,
                position: 'relative',
                '&:hover': {
                  '& button': {
                    visibility: 'visible',
                  },
                },
              }}
            >
              <Button
                startIcon={
                  <SvgIcon>
                    <Image03Icon />
                  </SvgIcon>
                }
                sx={{
                  backgroundColor: blueGrey[900],
                  bottom: {
                    lg: 24,
                    xs: 'auto',
                  },
                  color: 'common.white',
                  position: 'absolute',
                  right: 24,
                  top: {
                    lg: 'auto',
                    xs: 24,
                  },
                  visibility: 'hidden',
                  '&:hover': {
                    backgroundColor: blueGrey[900],
                  },
                }}
                variant="contained"
              >
                Change Cover
              </Button>
            </Box> */}
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 5 }}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <Avatar
                  src={userObj.profile_pic}
                  alt={profile.avatar}
                  sx={{
                    height: 100,
                    width: 100,
                  }}
                />
                <div>
                  <Typography
                    color="text.secondary"
                    variant="overline"
                  >
                    {userObj.job_title}
                  </Typography>
                  <Typography variant="h4">{userObj.first_name} {userObj.last_name}</Typography>
                </div>
              </Stack>
              <Box sx={{ flexGrow: 1 }} />
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none',
                  },
                }}
              >
                    <Button
                      size="small"
                      startIcon={
                      <SvgIcon>
                        <Edit />
                      </SvgIcon>
                      }
                      variant="contained"
                      onClick={handleEditProfileClick}>
                      Edit Profile
                    </Button>
                {/* <Button
                  component={RouterLink}
                  href={userObj.id === sessionCookies.user_id_token ? paths.chat : paths.chat.interact}
                  size="small"
                  startIcon={
                    <SvgIcon>
                      <MessageChatSquareIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Chat
                </Button> */}
              </Stack>
              <Tooltip title="More options">
                <IconButton>
                  <SvgIcon>
                    <DotsHorizontalIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </Stack>
              </div>

          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            sx={{ mt: 5 }}
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
          <Box sx={{ mt: 2 }}>
            {currentTab === 'timeline' && (
              <SocialTimeline
                posts={posts}
                profile={profile}
              />
            )}
            {currentTab === 'projects' && (
              <UsersProjects
                projects={projects}
              />
            )}
            {currentTab === 'connections' && (
              <SocialConnections
                connections={users}
                onQueryChange={handleUsersQueryChange}
                query={usersQuery}
              />
            )}


              </Box>

              </Container>
            </Box>
          </Box>
      )}
       <Dialog
        open={openEditModal}
        onClose={handleCancelEdit}
        aria-labelledby="edit-profile-modal-title"
        PaperProps={{
          style: {
            maxWidth: '5000px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '16px',
            borderRadius: '16px',
          },
        }}
      >
        <EditProfileForm
          user={userObj}
          onSubmit={handleUpdateProfile}
          onCancel={handleCancelEdit}
        />
      </Dialog>
    </>
  );
};

GenUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default GenUser;


