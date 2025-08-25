E-commerce REST API
A fully-featured RESTful API for an e-commerce platform built with Node.js, Express, PostgreSQL, and JWT authentication.

🌟 Features
User Authentication: JWT-based registration and login system

Product Management: Full CRUD operations with admin authorization

Shopping Cart: Complete cart functionality with item management

Order Processing: Checkout system and order history

Role-Based Access Control: Different permissions for admins and users

API Documentation: Comprehensive Swagger/OpenAPI documentation

Input Validation: Robust validation for all endpoints

🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

PostgreSQL (v12 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/ifeadeagbo/ecommerce-api.git
cd ecommerce-api
Install dependencies

bash
npm install
Set up environment variables

bash
# Create .env file from example
cp .env.example .env

# Edit with your configuration
DATABASE_URL=postgres://username:password@localhost:5432/ecommerce
PORT=3000
JWT_SECRET=your_very_secure_jwt_secret_here
Set up the database

bash
# Initialize the database schema
psql -U postgres -f init.sql
Start the server

bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
Access API documentation
Open your browser and navigate to http://localhost:3000/api-docs

📚 API Documentation
Interactive API documentation is available at /api-docs endpoint when the server is running. This provides:

Complete endpoint descriptions

Request/response examples

Interactive testing capability

Schema definitions

🔐 Authentication
This API uses JWT (JSON Web Tokens) for authentication. Most endpoints require including a token in the Authorization header:

text
Authorization: Bearer <your_jwt_token>
Getting Started with Authentication
Register a new user

bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }'
Login to get JWT token

bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
Use the token in subsequent requests

bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
🗂️ API Endpoints
Authentication Endpoints
Method	Endpoint	Description	Auth Required
POST	/users/register	Register a new user	No
POST	/users/login	Login and receive JWT token	No
User Endpoints
Method	Endpoint	Description	Auth Required
GET	/users	Get all users	Yes (Admin)
GET	/users/:userId	Get user by ID	Yes
PUT	/users/:userId	Update user details	Yes
Product Endpoints
Method	Endpoint	Description	Auth Required
GET	/products	Get all products	No
GET	/products?category=:id	Filter products by category	No
GET	/products/:productId	Get product details	No
POST	/products	Create a new product	Yes (Admin)
PUT	/products/:productId	Update a product	Yes (Admin)
DELETE	/products/:productId	Delete a product	Yes (Admin)
Cart Endpoints
Method	Endpoint	Description	Auth Required
POST	/cart	Create a new cart	Yes
POST	/cart/:cartId	Add item to cart	Yes
GET	/cart/:cartId	Get cart contents	Yes
POST	/cart/:cartId/checkout	Checkout cart	Yes
Order Endpoints
Method	Endpoint	Description	Auth Required
GET	/orders	Get user's order history	Yes
GET	/orders/:orderId	Get order details	Yes
🏗️ Project Structure
text
ecommerce-api/
├── controllers/          # Route controllers
│   ├── authController.js
│   ├── userController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── middleware/           # Custom middleware
│   ├── auth.js          # Authentication middleware
│   ├── validation.js    # Input validation
│   └── errorHandler.js  # Error handling
├── routes/              # Express route definitions
│   ├── auth.js
│   ├── users.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
├── config/              # Configuration files
│   └── database.js      # DB connection setup
├── models/              # Database models
├── utils/               # Utility functions
├── init.sql             # Database schema
├── swagger.yaml         # API documentation
├── package.json
└── server.js            # Application entry point
🧪 Testing
Run the test suite to verify everything is working correctly:

bash
# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
🐛 Troubleshooting
Common issues and solutions:

Database connection errors

Verify PostgreSQL is running

Check DATABASE_URL in .env file

Authentication issues

Ensure JWT_SECRET is set in environment variables

Verify token is included in Authorization header

Port already in use

Change PORT in .env file or stop other processes using port 3000

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the ISC License - see the LICENSE file for details.

👨‍💻 Author
Ifeoluwa Adeagbo

GitHub: @ifeadeagbo
