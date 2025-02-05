

```markdown:README.md
# Stark Projects

A project management application built with Django REST Framework and React. This application allows users to manage projects, repositories, and trackers with Keycloak authentication.

## Features

- User authentication with Keycloak
- CRUD operations for projects
- Repository management (GitHub, GitLab, Bitbucket)
- Tracker management (GitHub, GitLab, Jira)
- Responsive UI with Material-UI

## Tech Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: React, Material-UI
- **Authentication**: Keycloak
- **Database**: SQLite3

## How to Run

### Prerequisites

- Python 3.8+
- Node.js 14+
- Docker (for Keycloak)
- Git

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/Lambersonistaken/stark_projects.git
cd stark_projects
```

2. Set up the backend
```bash
# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On Unix/MacOS

# Install dependencies
pip install -r requirements.txt

# Create database and run migrations
python manage.py makemigrations
python manage.py migrate

# Start the backend server
python manage.py runserver
```

3. Start Keycloak
```bash
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev
```

4. Set up the frontend
```bash
cd stark-frontend
npm install
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Keycloak: http://localhost:8080

### Initial Setup

1. Access Keycloak admin console at http://localhost:8080
   - Username: admin
   - Password: admin

2. Create a new client in Keycloak:
   - Client ID: stark-frontend
   - Client Protocol: openid-connect
   - Access Type: public
   - Valid Redirect URIs: http://localhost:5173/*

## Repository

This project is hosted at: https://github.com/Lambersonistaken/stark_projects

## License

MIT License

```

