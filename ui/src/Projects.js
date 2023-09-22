import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Tabs, Tab, List, ListItem, Typography, Box, Card } from "@mui/material";
import { useCookies, CookiesProvider } from 'react-cookie';

const Projects = (props) => {
  const { profile, ...other } = props;
  const [projects, setProjects] = useState([]);
  const [filterVar, setFilterVar] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])

  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => res.json())
      .then((projectsData) => {
        const approvedProjects = projectsData.filter((p) => p.is_approved);
        setProjects(projectsData);
        setFilterVar(approvedProjects);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);

    switch (newValue) {
      case 0:
        setFilterVar(projects.filter((p) => p.is_approved));
        break;
      case 1:
        setFilterVar(projects.filter((p) => !p.is_accepted && !p.is_completed && p.is_approved));
        break;
      case 2:
        setFilterVar(projects.filter((p) => p.is_accepted && p.is_approved));
        break;
      case 3:
        setFilterVar(projects.filter((p) => p.is_completed && p.is_approved));
        break;
      case 4:
        setFilterVar(projects.filter((p) => !p.is_approved));
        break;

      default:
        setFilterVar(projects.filter((p) => p.is_approved));
        break;
    }
  };

  const handleProjectClick = (projectId) => {
    // Navigate to the detailed summary page for the clicked project
    navigate(`/projects/${projectId}`);
  };

  return (
    <Box padding="20px" height="90%" style={{ marginTop: "25px", marginLeft: "50px", marginRight: "50px" , marginBottom: "50px", background: 'rgba(255,255,255, 0.85)', borderRadius: '25px'}}>
      <Typography variant="h4" gutterBottom style={{textAlign: "center"}}>
        {" "}
        Bounties{" "}
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        bgcolor="primary">

        <Tab bgcolor="blue" label="All" />
        <Tab label="Unaccepted" />
        <Tab label="Accepted" />
        <Tab label="Complete" />
        {sessionCookies.userPriv_Token === true ?  <Tab label="Pending" /> : <></>}

      </Tabs>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>

        {filterVar.map((project) => (
          <Card sx={{
            height: 300,
            width: '25%',
            m: 2,
            padding: 1,
            textAlign: 'center',
            borderRadius: "15px",
            background: "rgba(96,112,151, .85)"
          }}>
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              style={{textAlign: "center"}}>
              <h2>{project.name}</h2>
              <p style={{marginLeft: '4px', textAlign: "left"}}>Problem Statement: {project.problem_statement}</p>
            </div>
          </Card>
        ))}
      </div>
    </Box>
  );
};

Projects.propTypes = {
  projects: PropTypes.array,
  // profile: PropTypes.object.isRequired,
};

export default Projects;
