import { Button, Container, Typography } from "@mui/material";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/realms/master/protocol/openid-connect/auth?client_id=stark-frontend&redirect_uri=http://localhost:5173&response_type=code";
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login with Keycloak
      </Button>
    </Container>
  );
};

export default Login;
