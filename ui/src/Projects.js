import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Tabs, Tab, List, ListItem, Typography } from '@mui/material';

const Projects = (props) => {
  const { profile, ...other } = props;
  const [projects, setProjects] = useState([]);
  const [filterVar, setFilterVar] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => res.json())
      .then((projectsData) => {
        const approvedProjects = projectsData.filter(p => p.is_approved);
        setProjects(approvedProjects);
        setFilterVar(approvedProjects);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);

    switch (newValue) {
      case 0:
        setFilterVar(projects.filter(p => p.is_approved));
        break;
      case 1:
        setFilterVar(projects.filter(p => !p.is_accepted && p.is_approved));
        break;
      case 2:
        setFilterVar(projects.filter(p => p.is_accepted && p.is_approved));
        break;
      case 3:
        setFilterVar(projects.filter(p => p.is_completed && p.is_approved));
        break;
      default:
        setFilterVar(projects.filter(p => p.is_approved));
        break;
    }
  };

  const handleProjectClick = (projectId) => {
    // Navigate to the detailed summary page for the clicked project
    navigate(`/projects/${projectId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom> Bounties </Typography>

      <Tabs value={selectedTab} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
        <Tab label="All" />
        <Tab label="Unaccepted" />
        <Tab label="Accepted" />
        <Tab label="Complete" />
      </Tabs>

      <List>
        {filterVar.map((project) => (
          <ListItem
            key={project.id}
            button
            onClick={() => handleProjectClick(project.id)}
          >
            {project.name} - {project.problem_statement}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.array,
  // profile: PropTypes.object.isRequired,
};

export default Projects;
