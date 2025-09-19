# Blog backend 
  This is the backend for my blog app. It allows users to sign up, log in, log out, create post, update and delete posts. 
  It is built with Node.js, Express, and MongoDB.

## Table of contents
- [Features](#features)
- [Tech Stark](#tech-stark)
- [Folder-Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage--running-the-app)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots-or-images)
- [Live Demo](#live-demo--deployed-link)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author-info--contact)
- [Acknowledgements](#acknowledgements--credits)

## Features
- User Authentication (signup/login)
- Create, Read, Update, Delete (CRUD) posts
- Manage users
- JWT-based security

## Tech Stark
| Technology | Purpose |
| ---------- | ------- |
| Node.js    | Runtime environment |
| Express.js | Web framework |
| MongoDB    | Database |
| Mongoose   | ODM (Object Data Modeling) |
| JWT        | Authentication |

## Folder-Structure
```
MYBLOG/
|- config/
|- controllers/
|- middleware/
|- models/
|- routes/
|- utils/
|- package.json
|- server.js
```

## Environment Variables
You need to create a `.env` file in the root and add the following:

- `port` -> Port Number (eg. 3000)
- `MONGO_URI` → Your MongoDB connection string
- `JWT_SECRET` → Secret key for authentication

## Installation
1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/blog-backend.git

2. Go to the folder
```bash
cd MYBLOG
```

3. Install dependencies
```bash
npm install
```

## Usage 

This project uses **nodemon** so the server automatically restarts when you change your code.

### Install nodemon (only once)
If you don’t already have it, install nodemon globally:
```bash
npm install -g nodemon

1. Run the server
Start the server with nodemon:
 
```bash
npm nodemon server.js
```
### Test the API
Example with Postman:

Method: POST

URL: http://localhost:5000/api/users/login

Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```
If it works, you should get back a response with user data and a token.

## API Endpoints
| Method | Endpoint         | Description          |
|--------|----------------- |----------------------|
| POST   | /api/users       | Register a new user   |
| POST   | /api/users/login | Login user            |
| GET    | /api/posts       | Get all posts         |
| POST   | /api/posts       | Create a new post     |
| PUT    | /api/posts/:id   | Update a post         |
| DELETE | /api/posts/:id   | Delete a post         |

## Screenshots
![API test in Postman](/images/postman_test.png)

## Contributing
1. Fork the repo  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Commit changes (`git commit -m 'Add new feature'`)  
4. Push to branch (`git push origin feature-branch`)  
5. Open a Pull Request 

## License
This project is licensed under the MIT License – you’re free to use, copy, and modify it, but without any warranty.

## Author
- Name: Ikeji Angel  
- GitHub: [Angeliska1](https://github.com/Angeliska1)  

## Acknowledgements
- *My Tutor*
- *Inspired by Youtube tutors* 
- *Express.js documentation*  
- *MongoDB documentation*



















