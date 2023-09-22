import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Tabs, Tab, List, ListItem, Typography, Button, Card, CardContent, Box, Avatar, Divider, ListItemText, TextField } from "@mui/material";
import { useCookies, CookiesProvider } from 'react-cookie';
import { useParams } from 'react-router-dom';

const MyBounties = (props) => {
  const { profile, ...other } = props;
  const [projects, setProjects] = useState([]);
  const [filterVar, setFilterVar] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
  const { id } = useParams();
  const [userObj, setUserObj] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => res.json())
      .then((projectsData) => {
        console.log('id from mybounties:', id)
        const approvedProjects = projectsData.filter((p) => p.accepted_by_id === parseInt(id));
        setProjects(projectsData);
        setFilterVar(approvedProjects);
      })
      .catch((err) => console.log(err));
      userRefetch();
  }, []);

  const userRefetch = async () => {
    await fetch(`http://localhost:8080/users/${id}`)
        .then((res) => res.json())
        .then((fetchData) => setUserObj(fetchData[0]))
}

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);

    switch (newValue) {
      case 0:
        setFilterVar(projects.filter((p) => p.accepted_by_id === parseInt(id)));
        break;
      case 1:
        setFilterVar(projects.filter((p) => !p.is_completed && p.is_accepted && p.is_approved && p.accepted_by_id === parseInt(id)));
        break;
      case 2:
        setFilterVar(projects.filter((p) => p.is_completed && p.is_approved && p.accepted_by_id === parseInt(id)));
        break;
      default:
        setFilterVar(projects.filter((p) => p.accepted_by_id === parseInt(id)));
        break;
    }
  };

  const handleProjectClick = (projectId) => {
    // Navigate to the detailed summary page for the clicked project
    navigate(`/projects/${projectId}`);
  };

  return (
    <Box padding="20px" height="100vh" style={{ marginTop: "25px", marginLeft: "50px", marginRight: "50px", background: 'rgba(255,255,255, 0.85)', borderRadius: '25px'}}>
        <Typography variant="h4" gutterBottom style={{textAlign: "center"}}>
            {" "}
            {userObj.first_name}'s Bounties{" "}
        </Typography>

        <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary">
            <Tab label="All" />
            {/* <Tab label="Unaccepted" /> */}
            <Tab label="Accepted" />
            <Tab label="Complete" />
            {/* {sessionCookies.userPriv_Token === true ?  <Tab label="Pending" /> : <></>} */}

        </Tabs>

        <List>
            {filterVar.map((project) => (
            <ListItem
                key={project.id}
                button
                onClick={() => handleProjectClick(project.id)}>
                {project.name} - {project.problem_statement}
            </ListItem>
            ))}
        </List>
    </Box>
  );
};

MyBounties.propTypes = {
  projects: PropTypes.array,
  // profile: PropTypes.object.isRequired,
};

export default MyBounties;
