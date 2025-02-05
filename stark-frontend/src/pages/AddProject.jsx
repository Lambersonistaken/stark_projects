import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { 
  Container, TextField, Button, Typography, 
  Select, MenuItem, FormControl, InputLabel,
  Grid,
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../utils/axiosConfig';

const REPOSITORY_TYPES = ["GitHub", "GitLab", "Bitbucket"];
const TRACKER_TYPES = ["GitHub", "GitLab", "Jira"];

const isValidUrl = (url) => {
  try {
    // URL'in başında http:// veya https:// yoksa ekle
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const AddProject = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    slug: "",
    description: "",
    language: "",
    repositories: [],
    trackers: []
  });
  
  const navigate = useNavigate();

  const handleAddRepository = () => {
    setProjectData({
      ...projectData,
      repositories: [...projectData.repositories, {
        title: "",
        url: "",
        type: "GitHub",
        email: "",
        token: ""
      }]
    });
  };

  const handleAddTracker = () => {
    setProjectData({
      ...projectData,
      trackers: [...projectData.trackers, {
        title: "",
        url: "",
        type: "GitHub",
        email: "",
        token: ""
      }]
    });
  };

  const handleRepositoryChange = (index, field, value) => {
    const newRepositories = [...projectData.repositories];
    
    if (field === 'url') {
      // URL validasyonu
      if (value && !isValidUrl(value)) {
        // URL geçersizse hata mesajı göster
        alert('Please enter a valid URL (e.g., github.com/username/repo or https://github.com/username/repo)');
        return;
      }
      // URL'in başında http:// veya https:// yoksa ekle
      if (value && !/^https?:\/\//i.test(value)) {
        value = 'https://' + value;
      }
    }
    
    newRepositories[index][field] = value;
    setProjectData({ ...projectData, repositories: newRepositories });
  };

  const handleTrackerChange = (index, field, value) => {
    const newTrackers = [...projectData.trackers];
    
    if (field === 'url') {
      // URL validasyonu
      if (value && !isValidUrl(value)) {
        // URL geçersizse hata mesajı göster
        alert('Please enter a valid URL (e.g., jira.com/project or https://jira.com/project)');
        return;
      }
      // URL'in başında http:// veya https:// yoksa ekle
      if (value && !/^https?:\/\//i.test(value)) {
        value = 'https://' + value;
      }
    }
    
    newTrackers[index][field] = value;
    setProjectData({ ...projectData, trackers: newTrackers });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Boş repository ve tracker'ları filtrele
    const formData = {
      name: projectData.name,
      slug: projectData.slug,
      description: projectData.description,
      language: projectData.language,
      repositories: projectData.repositories
        .filter(repo => repo.title && repo.url) // Sadece title ve url'si olan repository'leri al
        .map(repo => ({
          title: repo.title,
          url: repo.url,
          type: repo.type || 'GitHub',
          email: repo.email || '',
          token: repo.token || ''
        })),
      trackers: projectData.trackers
        .filter(tracker => tracker.title && tracker.url) // Sadece title ve url'si olan tracker'ları al
        .map(tracker => ({
          title: tracker.title,
          url: tracker.url,
          type: tracker.type || 'GitHub',
          email: tracker.email || '',
          token: tracker.token || ''
        }))
    };

    console.log('Sending data:', formData);

    axiosInstance.post("/projects/", formData)
      .then(response => {
        console.log('Success:', response.data);
        alert("Project created successfully!");
        navigate("/");
      })
      .catch(error => {
        console.error("Error details:", error.response?.data);
        alert(`Error creating project: ${error.response?.data?.detail || 'Unknown error'}`);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add New Project</Typography>
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

          {/* Repository Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Repositories</Typography>
            {projectData.repositories.map((repo, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={repo.title}
                    onChange={(e) => handleRepositoryChange(index, 'title', e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="URL"
                    value={repo.url || ''}
                    onChange={(e) => handleRepositoryChange(index, 'url', e.target.value)}
                    helperText="Enter a valid URL (e.g., github.com/username/repo)"
                    error={Boolean(repo.url) && !isValidUrl(repo.url)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={repo.type}
                      onChange={(e) => handleRepositoryChange(index, 'type', e.target.value)}
                    >
                      {REPOSITORY_TYPES.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={repo.email}
                    onChange={(e) => handleRepositoryChange(index, 'email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Token"
                    type="password"
                    value={repo.token}
                    onChange={(e) => handleRepositoryChange(index, 'token', e.target.value)}
                  />
                </Grid>
              </Grid>
            ))}
            <Button onClick={handleAddRepository}>Add Repository</Button>
          </Grid>

          {/* Tracker Section - Similar to Repository section */}
          <Grid item xs={12}>
            <Typography variant="h6">Trackers</Typography>
            {projectData.trackers.map((tracker, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                {/* Similar fields as repository */}
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={tracker.title}
                    onChange={(e) => handleTrackerChange(index, 'title', e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="URL"
                    value={tracker.url || ''}
                    onChange={(e) => handleTrackerChange(index, 'url', e.target.value)}
                    helperText="Enter a valid URL (e.g., jira.com/project)"
                    error={Boolean(tracker.url) && !isValidUrl(tracker.url)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={tracker.type}
                      onChange={(e) => handleTrackerChange(index, 'type', e.target.value)}
                    >
                      {TRACKER_TYPES.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={tracker.email}
                    onChange={(e) => handleTrackerChange(index, 'email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Token"
                    type="password"
                    value={tracker.token}
                    onChange={(e) => handleTrackerChange(index, 'token', e.target.value)}
                  />
                </Grid>
              </Grid>
            ))}
            <Button onClick={handleAddTracker}>Add Tracker</Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Project
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProject;
