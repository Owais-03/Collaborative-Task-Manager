# Collaborative-Task-Manager
A Task Manager that allows team colleagues to add , update , delete , update-status , filter based on task-status and assignee name and Much More 
## Overview

Collaborative Task Manager is a MERN-stack web application that allows users to manage tasks collaboratively. Users can register, log in, create, update, filter, and delete tasks. The app supports user authentication, file uploads for profile photos, and email notifications for password resets.

## Tech Stack

### Frontend
- **React** (with TypeScript): For building the user interface.
- **Material-UI (MUI)**: For modern, responsive UI components.
- **Bootstrap**: For additional styling and layout.
- **Axios**: For making HTTP requests to the backend API.

### Backend
- **Node.js** & **Express.js**: For building the RESTful API server.
- **MongoDB** & **Mongoose**: For database and object modeling.
- **Passport.js**: For authentication.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **Nodemailer**: For sending password reset emails.
- **Cloudinary**: For storing user profile images.
- **Multer**: For handling file uploads.
- **dotenv**: For environment variable management.

## Features

- **User Registration & Login**: Secure authentication with JWT and Passport.
- **Profile Management**: Update profile info and upload profile photos.
- **Task Management**: Create, update, filter, and delete tasks.
- **Task Filtering**: Filter tasks by status and assignee.
- **Password Reset**: Request password reset via email.
- **Responsive UI**: Modern design using Material-UI and Bootstrap.
- **Collaborative**: Multiple users can manage and assign tasks.

## Getting Started

1. **Clone the repository**
2. **Install dependencies** for both frontend and backend
3. **Set up environment variables** in `.env` files
4. **Run the backend**:  
   ```
   cd backend
   npm run dev
   ```
5. **Run the frontend**:  
   ```
   cd frontend
   npm start
   ```
6. **Access the app** at `http://localhost:5173`

---

**Note:**  
You need valid credentials for MongoDB, Cloudinary, and an email provider (e.g., Gmail) for full functionality.  
See `.env` files for required environment variables.

---
