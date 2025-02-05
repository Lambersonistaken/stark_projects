import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, Typography, Button, Card, CardContent, 
  Grid, List, ListItem, ListItemText, Divider 
} from "@mui/material";
import axiosInstance from '../utils/axiosConfig';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/projects/${id}/`)
      .then(response => setProject(response.data))
      .catch(error => console.error("Error fetching project details", error));
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <Container>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>{project.name}</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography><strong>Slug:</strong> {project.slug}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Description:</strong> {project.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Language:</strong> {project.language}</Typography>
            </Grid>

            {/* Repositories Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Repositories</Typography>
              <List>
                {project.repositories?.map((repo, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={repo.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Type: {repo.type}<br />
                            URL: {repo.url}<br />
                            Email: {repo.email}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Trackers Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Trackers</Typography>
              <List>
                {project.trackers?.map((tracker, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={tracker.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Type: {tracker.type}<br />
                            URL: {tracker.url}<br />
                            Email: {tracker.email}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/")}
        sx={{ mr: 2 }}
      >
        Back
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => navigate(`/edit-project/${id}`)}
      >
        Edit Project
      </Button>
    </Container>
  );
};

export default ProjectDetail;
