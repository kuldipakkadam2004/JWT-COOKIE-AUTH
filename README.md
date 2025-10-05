# Node.js JWT Authentication API

A **secure and scalable backend API** built with **Node.js**, **Express**, and **MongoDB**, implementing **JWT-based authentication** with **access and refresh tokens**.  

This project demonstrates how to create a **production-ready authentication system** using best practices, including:

- Password hashing with **bcrypt**  
- **JWT access tokens** for stateless authentication  
- **Refresh token rotation** to maintain long-term sessions  
- Cookie-based storage for refresh tokens (HttpOnly, SameSite)  
- Clean **MVC architecture**  

It is ideal for developers learning backend authentication or building secure web applications that require user login and session management.

---

## Features

- User registration (`/api/auth/register`)  
- User login (`/api/auth/login`)  
- Access token refresh (`/api/auth/refresh`)  
- Logout with refresh token invalidation (`/api/auth/logout`)  
- Protected route to get user profile (`/api/userProfile`)  
- Passwords securely hashed with bcrypt  
- JWT authentication with access and refresh tokens  
- Refresh token rotation to prevent token reuse attacks  
- MVC project structure for clean and maintainable code  

---

## Project Structure

├── controllers/
│ ├── auth.controller.js # Handles login, register, logout, refresh
│ └── user.controllers.js # Handles user profile
├── models/
│ └── users.models.js # User schema
├── routes/
│ ├── auth.routes.js # Auth endpoints
│ └── profile.routes.js # Profile endpoints
├── middlewares/
│ └── auth.mw.js # JWT validation middleware
├── utils/
│ └── jwt.js # JWT token generation and verification
├── config/
│ └── db.js # MongoDB connection
├── app.js # Main server file
├── package.json
└── .env # Environment variables

## Installation

1. Clone the repository:

git clone <your-repo-url>
cd <project-folder>
Install dependencies:

npm install
Create a .env file in the root directory:

.env

PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-db-name
ACCESS_TOKEN_SECRET_KEY=yourAccessSecretKey
REFRESH_TOKEN_SECRET_KEY=yourRefreshSecretKey
Start the server:

npm start
The server will run at http://localhost:5000.

API Endpoints 
Auth Routes (/api/auth)
Method	Endpoint	Description
POST	/register	Create a new user account
POST	/login	Login and get access token
POST	/refresh	Refresh expired access token
POST	/logout	Logout and clear refresh token

User Routes (/api)
Method	Endpoint	Description
GET	/userProfile	Get logged-in user's profile

Note: Protected routes require a valid access token in the Authorization header:
Authorization: Bearer <accessToken>

Security Features
Passwords hashed using bcrypt

Access tokens expire quickly (30 min)

Refresh tokens stored in HttpOnly cookies

Refresh token rotation ensures old tokens are invalidated

Configurable JWT secrets and token expiry via .env

Dependencies
-express
-mongoose
-bcrypt
-jsonwebtoken

dotenv

cookie-parser
