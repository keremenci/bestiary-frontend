# Bestiary Frontend

This is the frontend application for the Bestiary CRUD system, a web application for managing beasts in Dungeons & Dragons 5th Edition. The frontend is built using React and communicates with a backend API to perform CRUD operations on the beast data.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)

## Features

- **Add, Edit, and Delete Beasts**: Manage beast entries with ease.
- **Real-time Updates**: Interacts with the backend API to reflect changes immediately.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- **npm**: Node.js comes with npm, which is used to install dependencies.
- **docker**: For running with docker

### Installation

1. **Clone the Repository**:
```bash
git clone https://github.com/keremenci/bestiary-frontend.git
cd bestiary-frontend
```

2. **Install Dependencies:**:

```bash
npm install
```

### Running the Application
To run the application locally:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Docker Setup
To run the application using Docker:
1. Build the Docker Image:
```bash
docker build -t bestiary-frontend .
```

2. Run the Docker Container:
```bash
docker run -p 3000:80 bestiary-frontend
```

The application will be available at `http://localhost:3000`.