E-commerce API
This is a RESTful API for an e-commerce application built with Node.js, Express, PostgreSQL, and Passport.js. It supports user registration and login, product management, cart operations, checkout, and order history. The API is documented using Swagger and includes input validation and role-based access control (admin/user roles).
Features

User Management: Register, login, view, and update user accounts.
Product Management: CRUD operations for products (admin-only for create/update/delete).
Cart Operations: Create carts, add items, view cart, and checkout.
Order Management: View order history and order details.
Authentication: JWT-based authentication with Passport.js local strategy.
Authorization: Admin-only access for product management.
Documentation: Swagger UI for API documentation at /api-docs.

Prerequisites

Node.js (v16 or higher)
PostgreSQL (v12 or higher)
Git
A GitHub account (for repository hosting)

Installation

Clone the Repository:
git clone https://github.com/ifeadeagbo/ecommerce-api.git
cd ecommerce-api


Install Dependencies:
npm install


Set Up Environment Variables:

Create a .env file in the root directory based on the example below:
DATABASE_URL=postgres://postgres:your_password@localhost:5432/ecommerce
PORT=3000
JWT_SECRET=your_jwt_secret_key


Replace your_password with your PostgreSQL password and your_jwt_secret_key with a secure random string (e.g., generate using openssl rand -base64 32).



Set Up PostgreSQL Database:

Create the database and tables by running the init.sql script:
psql -U postgres -f init.sql


Optionally, add a test admin user:
INSERT INTO users (username, password, email, role)
VALUES ('admin', '$2b$10$your_bcrypt_hash', 'admin@example.com', 'admin');


Generate a bcrypt hash for the password:
const bcrypt = require('bcrypt');
bcrypt.hash('admin_password', 10).then(hash => console.log(hash));







Running the Application

Start the Server:
npm start


The server runs on http://localhost:3000 (or the port specified in .env).


Access API Documentation:

Open http://localhost:3000/api-docs in a browser to view the Swagger UI.



API Endpoints
Authentication

POST /users/register: Register a new user (username, password, email).
POST /users/login: Login and receive a JWT token.

Users

GET /users: Get all users (authenticated).
GET /users/{userId}: Get a user by ID (authenticated).
PUT /users/{userId}: Update user details (authenticated).

Products

GET /products?category={categoryId}: Get products, optionally filtered by category.
GET /products/{productId}: Get a product by ID.
POST /products: Create a product (admin only).
PUT /products/{productId}: Update a product (admin only).
DELETE /products/{productId}: Delete a product (admin only).

Cart

POST /cart: Create a new cart (authenticated).
POST /cart/{cartId}: Add an item to a cart (authenticated).
GET /cart/{cartId}: Get cart details (authenticated).
POST /cart/{cartId}/checkout: Checkout a cart, creating an order (authenticated).

Orders

GET /orders: Get all orders for a user (authenticated).
GET /orders/{orderId}: Get order details (authenticated).

Authentication

Protected endpoints require a JWT in the Authorization header: Bearer <token>.
Obtain a token via POST /users/login.

Testing

Use tools like Postman or curl to test endpoints.

Example: Register a user:
curl -X POST http://localhost:3000/users/register -H "Content-Type: application/json" -d '{"username":"testuser","password":"password123","email":"test@example.com"}'


Example: Login and get a token:
curl -X POST http://localhost:3000/users/login -H "Content-Type: application/json" -d '{"username":"testuser","password":"password123"}'



Project Structure
ecommerce-api/
├── controllers/        # Request handlers for each resource
├── middleware/         # Authentication and authorization middleware
├── routes/             # Express route definitions
├── .env                # Environment variables (not tracked)
├── .gitignore          # Git ignore rules
├── db.js               # PostgreSQL connection setup
├── init.sql            # Database schema
├── package.json        # Project dependencies and scripts
├── server.js           # Main server file
├── swagger.yaml        # API documentation

Contributing

Fork the repository and submit pull requests for improvements.
Report issues via GitHub Issues.

License
ISC License
Author

Ifeoluwa Adeagbo
