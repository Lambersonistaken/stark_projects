import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import keycloak from './keycloak';
import Home from './pages/Home';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        });
        setInitialized(true);
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
      } catch (error) {
        console.error('Keycloak initialization error:', error);
      }
    };

    if (!initialized) {
      initKeycloak();
    }
  }, [initialized]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-project" element={<AddProject />} />
      <Route path="/edit-project/:id" element={<EditProject />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;
