import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "40px", marginBottom: "40px" }}
    >
      <Card raised>
        <CardContent>
          <Typography variant="h3" align="center" gutterBottom>
            About SupraDev
          </Typography>

          <Box my={4}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              SupraDev is dedicated to connecting clients with top-tier
              developers from SupraCoders. Our platform is designed to
              facilitate the seamless execution of projects, driving innovation
              and excellence in software development.
            </Typography>
          </Box>

          <Box my={4}>
            <Typography variant="h5" gutterBottom>
              Problem Statement
            </Typography>
            <Typography paragraph>
              The challenge lies in creating a formal and efficient platform for
              requesting application creation and developmental services from
              SupraCoders, ensuring a streamlined process for both clients and
              developers.
            </Typography>
          </Box>

          <Box my={4}>
            <Typography variant="h5" gutterBottom>
              Our Services
            </Typography>
            <Typography paragraph>
              SupraDev offers a range of services including custom software
              development, mobile and web application development, UI/UX design,
              and system integration, all tailored to meet the specific needs of
              our clients.
            </Typography>
          </Box>

          <Box my={4}>
            <Typography variant="h5" gutterBottom>
              Why Choose Us
            </Typography>
            <Typography paragraph>
              Our commitment to quality and innovation sets us apart. With a
              team of skilled developers and creative designers, we ensure that
              every project is a step towards technological advancement, client
              satisfaction, and overall success.
            </Typography>
          </Box>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#800080" }}
              component={Link}
              to="/"
            >
              Back to Landing Page
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
