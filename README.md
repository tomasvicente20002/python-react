
# Frontend Web Application

This repository contains the source code for the frontend of a web application built with **React**, **Tailwind CSS**, and **Docker**.

## ✨ Technologies Used

- **React** – Main library for building the UI.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Axios** – For handling HTTP requests.
- **Docker** – Containerization and deployment.
- **Webpack with config-overrides** – For custom build configuration.
- **Authentication** – Includes basic authentication logic.

## 📁 Folder Structure

```
.
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── auth.js
│   │   └── axios.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
├── requirements.txt
```

## 🚀 Running the Project Locally

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### With Docker

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000` (or as configured).

### Without Docker

```bash
cd frontend
npm install
npm start
```

## 🧪 Available Scripts

- `npm start` – Starts the development server.
- `npm run build` – Builds the project for production.
- `npm run lint` – (Optional) Runs the linter, if configured.

## 🔐 Authentication

Authentication logic is handled in `src/auth.js` and HTTP requests are configured in `src/axios.js`.

## 📝 Notes

- This project uses `config-overrides.js` to customize React build (probably using `react-app-rewired`).
- UI components are stored in `src/components/ui/`.

## 📦 Dependencies

Check the `package.json` file for a complete list of dependencies.

## 🛠 Maintenance

- To add new styles, update `tailwind.config.js`.
- Build and Docker configurations are in `Dockerfile` and `docker-compose.yml`.
