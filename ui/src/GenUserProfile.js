import { useCallback, useEffect, useState } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';

import MessageChatSquareIcon from './icons/message-chat-square';
import DotsHorizontalIcon from './icons/dots-horizontal';
import Image03Icon from './icons/image-03';
import UserPlus02Icon from './icons/user-plus-02';

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

import { socialApi } from './social/index.js';
import { RouterLink } from './components/router-link';
import { Seo } from './components/seo';
import { useMounted } from './hooks/use-mounted';
import { usePageView } from './hooks/use-page-view';
import { Layout as DashboardLayout } from './layouts/layout.js';
import { paths } from './paths';
import { SocialConnections } from './social/social-connections';
import { SocialTimeline } from './social/social-timeline';
import  Projects  from './Projects'

const tabs = [
  { label: 'Timeline', value: 'timeline' },
  { label: 'Connections', value: 'connections' },
  { label: 'Projects', value:'projects'}
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

  console.log("Users from API:", users); // Debug: Log the received user data

  return users.filter((connection) => {
        return connection.first_name?.toLowerCase().includes(search);
      });

  // console.log("Filtered Users:", filteredUsers); // Debug: Log the filtered user data

  // return filteredUsers;
};


// const useConnections = (search = '') => {
//   const [connections, setConnections] = useState([]);
//   const isMounted = useMounted();

//   const handleConnectionsGet = useCallback(async () => {
//     const response = await socialApi.getConnections();

//     if (isMounted()) {
//       setConnections(response);
//     }
//   }, [isMounted]);

//   useEffect(
//     () => {
//       handleConnectionsGet();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [search]
//   );

//   console.log(connections)
//   return connections.filter((connection) => {
//     return connection.name?.toLowerCase().includes(search);
//   });
// };

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
  console.log(projects)
  return projects;
};

const GenUser = () => {
  const profile = useProfile();
  const [currentTab, setCurrentTab] = useState('timeline');
  const [status, setStatus] = useState('not_connected');
  const posts = usePosts();
  const projects = useProjects();
  const [usersQuery, setUsersQuery] = useState('');
  // const [connectionsQuery, setConnectionsQuery] = useState('');
  // const connections = useConnections(connectionsQuery);
  const users = useUsers(usersQuery);
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
  const [userObj, setUserObj] = useState([]);
  const [usersArr, setUsersArr] = useState([]);


  const userRefetch = async () => {
    await fetch(`http://localhost:8080/users/${sessionCookies.user_id_token}`)
        .then((res) => res.json())
        .then((fetchData) => setUserObj(fetchData[0]))
  }

  const usersFetch = async () => {
    await fetch(`http://localhost:8080/users`)
        .then((res) => res.json())
        .then((userfetchData) => setUsersArr(userfetchData))
  }
useEffect(() => {
  userRefetch();
  usersFetch();

},[])



  usePageView();

  const handleConnectionAdd = useCallback(() => {
    setStatus('pending');
  }, []);

  const handleNormalView = useCallback(() => {
    setStatus('not_connected');
  }, []);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  const handleUsersQueryChange = useCallback((event) => {
    setUsersQuery(event.target.value);
  }, []);
  // const handleConnectionsQueryChange = useCallback((event) => {
  //   setConnectionsQuery(event.target.value);
  // }, []);

  if (!profile) {
    return null;
  }




  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: 'white',
          flexGrow: 20,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <div>
            <Box
              style={{ backgroundImage: `url(${profile.cover})` }}
              sx={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: 3,
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
            </Box>
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
                    We need to make a job title table column...
                    {/* Should be job title in database */}
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
                {/* {showConnect && ( */}
                  <Button
                    onClick={handleConnectionAdd}
                    size="small"
                    color="primary"
                    startIcon={
                      <SvgIcon>
                        <UserPlus02Icon />
                      </SvgIcon>
                    }
                    variant="outlined"
                  >
                    Edit Profile
                  </Button>
                 {/* )} */}
                {/* {showPending && (
                  <Button
                    color="primary"
                    onClick={handleConnectionRemove}
                    size="small"
                    variant="outlined"
                  >
                    Pending
                  </Button>
                )} */}
                <Button
                  component={RouterLink}
                  href={paths.dashboard.chat}
                  size="small"
                  startIcon={
                    <SvgIcon>
                      <MessageChatSquareIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Chat
                </Button>
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
              <Projects
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
            {/* {currentTab === 'connections' && (
              <SocialConnections
                connections={usersArr}
                onQueryChange={handleConnectionsQueryChange}
                query={connectionsQuery}
              />
            )} */}

          </Box>
        </Container>
      </Box>
    </>
  );
};

GenUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default GenUser;


