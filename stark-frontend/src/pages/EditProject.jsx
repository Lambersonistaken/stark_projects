import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import axiosInstance from '../utils/axiosConfig';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    name: '',
    slug: '',
    description: '',
    language: '',
    repositories: [],
    trackers: []
  });

  useEffect(() => {
    axiosInstance.get(`/projects/${id}/`)
      .then(response => {
        setProjectData(response.data);
      })
      .catch(error => console.error('Error fetching project:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.put(`/projects/${id}/`, projectData)
      .then(() => {
        alert('Project updated successfully!');
        navigate('/');
      })
      .catch(error => console.error('Error updating project:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Edit Project</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Name"
              value={projectData.name}
              onChange={(e) => setProjectData({...projectData, name: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Slug"
              value={projectData.slug}
              onChange={(e) => setProjectData({...projectData, slug: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={projectData.description}
              onChange={(e) => setProjectData({...projectData, description: e.target.value})}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Language"
              value={projectData.language}
              onChange={(e) => setProjectData({...projectData, language: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Project
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProject; 