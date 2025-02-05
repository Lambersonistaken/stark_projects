import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosConfig';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/projects/")
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching projects!", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/add-project")}>
        Add Project
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {projects.map((project) => (
  <TableRow key={project.id}>
    <TableCell>{project.name}</TableCell>
    <TableCell>{project.description}</TableCell>
    <TableCell>{project.language}</TableCell>
    <TableCell>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate(`/projects/${project.id}`)}
        style={{ marginRight: 8 }}
      >
        View
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => navigate(`/edit-project/${project.id}`)}
        style={{ marginRight: 8 }}
      >
        Edit
      </Button>
      <Button 
        variant="contained" 
        color="error" 
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this project?')) {
            axiosInstance.delete(`/projects/${project.id}/`)
              .then(() => {
                setProjects(projects.filter(p => p.id !== project.id));
              })
              .catch(error => console.error("Error deleting project", error));
          }
        }}
      >
        Delete
      </Button>
    </TableCell>
  </TableRow>
))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
