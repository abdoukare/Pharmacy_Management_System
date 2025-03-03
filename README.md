# Pharmacy Management System

The **Pharmacy Management System** is a backend application designed to manage medicines, users, and authentication. It provides RESTful APIs for adding, updating, deleting, and fetching medicines, as well as user registration and login functionality.

## Features

- **Medicine Management**:
  - Add, update, delete, and fetch medicines.
  - Track medicine details such as name, ID, price, quantity, and expiry date.

- **User Authentication**:
  - Register new users.
  - Log in users and generate JWT (JSON Web Tokens) for authenticated requests.

- **Protected Routes**:
  - Secure APIs using JWT authentication.

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT (JSON Web Tokens) for authentication
  - bcrypt for password hashing
  - dotenv for environment variables

- **Tools**:
  - Postman (for API testing)
  - Git (for version control)

## API Documentation 

**Authentication**
1. Endpoint                 2. Method        3. Description
	/api/auth/register	    POST             Register new user
	/api/auth/login	        POST             Log in and return a JWT.
