Student Details

Name: Anshul Sharma

UID: 24BDA70368

Group: 24BDS-3(B)

Title

Full Stack Blog Platform (MERN Stack Application)

Defined Approach

In this experiment, a full-stack blog platform was developed using the MERN stack (MongoDB, Express.js, React, Node.js). The application demonstrates complete CRUD operations, authentication, protected routes, and relational data handling between users, posts, and comments. The backend provides RESTful APIs, while the frontend delivers an interactive and responsive user interface.

Features Overview
User registration and login using JWT authentication
Secure password hashing using bcryptjs
Create, edit, and delete blog posts (only by author)
Add and delete comments on posts
Protected routes for authenticated users
RESTful API integration with frontend
Relational data handling (User → Post → Comment)

Database Schema
User:    { username, email, password, bio }
Post:    { title, content, tags, author → User }
Comment: { content, post → Post, author → User }
Tech Stack
Backend
Node.js
Express.js
MongoDB
Mongoose
JSON Web Token (JWT)
bcryptjs
Frontend
React (Vite)
React Router
Axios
API Endpoints
Method	Endpoint	Auth	Description
POST	/api/auth/register	No	Register user
POST	/api/auth/login	No	Login and get JWT
GET	/api/auth/me	Yes	Get current user
GET	/api/posts	No	Fetch all posts
GET	/api/posts/:id	No	Fetch single post
POST	/api/posts	Yes	Create new post
PUT	/api/posts/:id	Yes	Update post (author only)
DELETE	/api/posts/:id	Yes	Delete post (author only)
GET	/api/comments/:postId	No	Get comments of a post
POST	/api/comments/:postId	Yes	Add comment
DELETE	/api/comments/:id	Yes	Delete comment (author only)
Requirements
Node.js >= 18.x
MongoDB running locally (port 27017)
npm >= 8.x
Setup & Installation
Backend Setup
cd backend
npm install
node server.js

Backend runs on:
👉 http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
👉 http://localhost:5173

Conclusion

This project enhanced understanding of:

Full-stack application development using MERN
Authentication and authorization using JWT
RESTful API design and integration
Database relationships using MongoDB and Mongoose
React-based frontend development with routing

It demonstrates how modern web applications are built with secure authentication, dynamic content handling, and scalable architecture.
