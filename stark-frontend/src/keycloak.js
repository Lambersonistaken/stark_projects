import Keycloak from "keycloak-js";

// Versiyon 17 ve üstü için:
const keycloak = new Keycloak({
  url: "http://localhost:8080",  // /auth olmadan
  realm: "master",
  clientId: "stark-frontend"
});

// VEYA Versiyon 16 ve altı için:
/*
const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",  // /auth ile
  realm: "stark_projects_realm",
  clientId: "stark-frontend"
});
*/

export default keycloak;
