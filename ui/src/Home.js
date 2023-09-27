import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar, Box, Card, CardContent, CardHeader, Grid, List, ListItem,
    ListItemAvatar, ListItemText, Typography, Paper, Button, Container, Divider
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Notification from './Notifications'

const HoverCard = styled(motion(Card))(({ theme }) => ({
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme?.shadows?.[8] ?? '0px 4px 20px rgba(0, 0, 0, 0.2)',

    },
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(5px)',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}));

const HomePage = () => {
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        // Fetch the projects
        fetch("http://localhost:8080/projects")
            .then((res) => res.json())
            .then((projectData) => {
                setProjects(projectData);
            })
            .catch((err) => console.log(err));

        // Fetch the users
        fetch("http://localhost:8080/users")
            .then((res) => res.json())
            .then((userData) => {
                setAllUsers(userData);
            })
            .catch((err) => console.log(err));
    }, []);

    const findSubmitter = (assocSubId) => {
        let outputUsername;
        for (let element in allUsers) {
          if (allUsers[element].id === assocSubId) {
            outputUsername = allUsers[element].username;
            return (
                outputUsername
            )
          }
        }
      }
      const findSubmitterImg = (assocSubId) => {
        let outputUserImg;
        for (let element in allUsers) {
          if (allUsers[element].id === assocSubId) {
            outputUserImg = allUsers[element].profile_pic;
            return (
                outputUserImg
            )
          }
        }
      }

      const findAcceptedImg = (assocSubId) => {
        let outputUserImg;
        for (let element in allUsers) {
          if (allUsers[element].id === assocSubId) {
            outputUserImg = allUsers[element].profile_pic;
            return (
                outputUserImg
            )
          }
        }
      }
      const findSubmittedUserId= (assocSubId) => {
        let UserId;
        for (let element in allUsers) {
          if (allUsers[element].id === assocSubId) {
            UserId = allUsers[element].id;
            return (
                UserId
            )
          }
        }
      }

      const findAcceptedUserId= (assocSubId) => {
        let UserId;
        for (let element in allUsers) {
          if (allUsers[element].id === assocSubId) {
            UserId = allUsers[element].id;
            return (
                UserId
            )
          }
        }
      }

      const findAcceptor = (assocAccId) => {
        let outputUsername;
        for (let element in allUsers) {
          if (allUsers[element].id === assocAccId) {
            outputUsername = allUsers[element].username;
            return (
              outputUsername
            )
          }
        }
      }

    const spaceSoftware = [
        {
            title: "SSC Data-Management Software Plays Critical Role in SDA, Afghanistan Airlift",
            description: "Sophisticated data management and analytic software programs are not only enhancing Space Systems Command’s (SSC) ability to carry out its Space Domain Awareness mission, but also have been leveraged to provide a rapid response to humanitarian crises across the globe. \"Data is the life blood of our digital force and our commercial partners have a lot that they can offer,” said Col. Jennifer M. Krolikowski, senior materiel leader for SSC Enterprise Corps’ West Coast data/cyber coding factory serving the United States Space Force (USSF). “These commercial solutions allow us to go faster which ultimately helps us turn that data into knowledge to drive decision-making.\”",
            link: "https://www.spaceforce.mil/News/Article-Display/Article/2813059/ssc-data-management-software-plays-critical-role-in-sda-afghanistan-airlift/"
        },
        {
            title: "The ever-evolving digital war fighter",
            description: "Supra coders are Airmen and Guardians who develop, manage, and design software for the U.S. Space Force. These individuals serve in a variety of specialties. Once they complete the Software Development Immersive (SDI) class, a software development boot camp that teaches full-stack JavaScript development and application deployment, they return to their bases to begin developing applications and solutions. U.S. Air Force Tech. Sgt. Urich Garcia, 45th Security Forces Squadron supra coder, and U.S. Air Force Staff Sgt. Brian Hardy, 45th SFS supra coder, completed the SDI class December 3, 2021 making them the first supra coders at Patrick SFB and the first supra coders in the security forces career field.",
            link: "https://www.spaceforce.mil/News/Article-Display/Article/3029674/the-ever-evolving-digital-war-fighter/"
        },
        {
            title: "Digital University: Enabling a force for the future",
            description: "Maintaining the U.S. Space Force’s strategic advantage in the space domain requires cutting-edge technology, but it also takes a workforce that can effectively and efficiently leverage that technology. To develop its force for the future, the Space Force is working with industry to provide educational resources in topics like Data Science, Artificial Intelligence, Software Development, Product Management, Design, Cybersecurity and Cloud Architecture through its Digital University.",
            link: "https://www.spaceforce.mil/News/Article/2926515/digital-university-enabling-a-force-for-the-future/"
        },
        {
            title: "Space Cockpit a new way to visualize space operations",
            description: "Space Cockpit is a situational awareness tool that allows satellite operators to visualize the satellites they control in a real-time, video game-like application. Originally commercial software, 1st Lieutenants Tory Smith and Jacqueline Cromer, Space Commercially Augmented Mission Platform (Space CAMP) software development leads, along with their product development team, spent months developing the software for Space Force professional’s use.",
            link: "https://www.spaceforce.mil/News/Article/2434500/space-cockpit-a-new-way-to-visualize-space-operations/"
        },
        {
            title: "392d CTS completes its first USEUCOM-focused SPACE FLAG exercise",
            description: "...“For the first time in SPACE FLAG, Cyber Guardians and Super Coders planned and executed simulated combat operations in real-time throughout the entirety of the exercise,” said U.S. Space Force Capt. Karl Pruhsmeier, 392d CTS and SPACE FLAG 23-1 exercise director. “Using a U.S. Air Force cyber range, the 527th Space Aggressor squadron was able to help us train multi-domain mission planning and execution, which exposed numerous opportunities to enhance mission assurance for orbital warfare, space domain awareness, space battle management, and other space warfighting functions.”",
            link: "https://www.spaceforce.mil/News/Article-Display/Article/3251072/392d-cts-completes-its-first-useucom-focused-space-flag-exercise/"
        }

    ]
    // useEffect(() => {
    //     // Fetch space-related software data from NASA's TechTransfer Software API
    //     fetch('https://api.nasa.gov/techtransfer/software/?engine&api_key=6WY9lR6IeiiTvLJG4U5V4qnnJzPJlpgMkmV8uKj9')
    //         .then(response => response.json())
    //         .then(data => setSpaceSoftware(data.results.slice(0, 10))) // Limit to 10 items
    //         .catch(error => console.error('Error fetching space software data:', error));
    // }, []);

    return (
        <Box
            component={motion.div}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                backgroundImage: 'url(/path-to-your-space-background-image)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Hero Section */}
            <Paper elevation={3} sx={{
                width: '100%',
                textAlign: 'center',
                padding: '40px 0',
                mb: 4,
                // backgroundColor: '#261928',
                backgroundImage: 'url(https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/9-abstract-smoke-duxx.jpg)',
                // 'linear-gradient(135deg, #020024 0%, #090979 37%, #00d4ff 100%)',
                // backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: '#FFF',
                borderRadius: '15px',
            }}>
                <Typography variant="h2" fontWeight="600" fontFamily="'Orbitron', sans-serif">
                    Welcome to Supra Dev!
                </Typography>
                <Typography variant="subtitle1" mt={2} fontFamily="'Orbitron', sans-serif">
                    Bridging the Gap Between Creativity and Collaboration
                </Typography>
                <Link to="/Login" style={{ textDecoration: 'none', marginTop: '20px' }}>
                    <Box mt={3}>
                        <Button variant="contained" style={{ backgroundColor: theme?.palette?.primary?.main || 'purple', color: '#fff' }} endIcon={<ArrowForwardIcon />}>
                            Get Started
                        </Button>
                    </Box>
                </Link>
            </Paper>
            <Grid container spacing={2} sx={{ width: '100%' }}>
                    {/* Notifications */}
                <Grid item xs={20} md={3}>
                    <Card elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                        <CardHeader title="Recent Activity" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                        <Typography variant="subtitle2" color="textSecondary">
                                    {/* {`There are currently ${projects.length} projects being worked`} */}
                        </Typography>
                        <CardContent>
                                {[...projects].reverse().map((project) => (
                                <div className="notification-section" key={project.id}>
                                    <Notification
                                        key={project.id}
                                        project={project}
                                        username={findAcceptor(project.accepted_by_id)}
                                        submitter={findSubmitter(project.submitter_id)}
                                        submittedUserId={project.submitter_id}
                                        acceptedUserId={project.accepted_by_id}
                                        submitterImg={findSubmitterImg(project.submitter_id)}
                                        acceptedImg={findAcceptedImg(project.accepted_by_id)}
                                    />
                                </div>
                                ))}
                            </CardContent>
                    </Card>
                </Grid>


                    {/* Space Software */}
                <Grid item xs={10} md={9}>
                    <Card className="card" elevation={3}>
                        <CardHeader title="Space Software News" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                            <CardContent>
                                {spaceSoftware.map((softwareItem, index) => (
                                <div key={index}>
                                    <Typography variant="h6" color="primary">
                                        <a href={softwareItem.link} target="_blank" rel="noopener noreferrer">{softwareItem.title.slice(0, 100)}</a>
                                    </Typography>
                                    <Typography variant="body1" mt={1}>
                                        {softwareItem.description.slice(0, 500)}...
                                    </Typography>
                                </div>
                                ))}
                            </CardContent>
                    </Card>
                </Grid>
            </Grid>

                    {/* Highlights
                    <Grid item xs={12} md={6}>
                        <HoverCard elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                            <CardHeader title="Highlights" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Success! Project J made major breakthroughs in XYZ
                                </Typography>
                                <Typography variant="body1" mt={1}>
                                    Supra Coder Snuffy figured out how to install DOOM in My...
                                </Typography>
                            </CardContent>
                        </HoverCard>
                    </Grid> */}
                    <Divider orientation="vertical" flexItem />
                    {/* Latest Notifications */}


                    {/* User Activity
                    <Grid item xs={12} md={6}>
                        <HoverCard elevation={3} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}>
                            <CardHeader title="Recent Activity" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
                            <CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i className="fas fa-plus"></i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Added a new project: Project XYZ." secondary="1 day ago" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i className="fas fa-trophy"></i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Claimed a bounty from John's project." secondary="2 days ago" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i className="fas fa-user-edit"></i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Updated profile picture." secondary="5 days ago" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </HoverCard>
                    </Grid> */}

                        <Box sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'white', backgroundImage: 'linear-gradient(135deg, #020024 0%, #090979 37%, #00d4ff 100%)' }}>

                            <Typography variant="body2">
                                © 2023 Supra Dev. All Rights Reserved.
                            </Typography>
                        </Box>
            </Box>
    );
};

export default HomePage;
