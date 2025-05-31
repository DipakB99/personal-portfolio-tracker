# Personal Portfolio Tracker

A full-stack web application to help users track their personal financial portfolio. Built using Angular, Node.js, Express, and MongoDB.

## Features

- User signup and login with JWT authentication
- Upload and store user profile images
- Dashboard showing portfolio graph (Kendo UI)
- Add and view portfolio data (value over time)
- Secure API with Express and MongoDB
- Fully responsive UI built with PrimeNG

## Tech Stack

Frontend: Angular 20, PrimeNG, Kendo UI  
Backend: Node.js, Express, MongoDB, Mongoose  
Others: Multer (file uploads), bcrypt (password hashing), JWT (auth)

## Project Structure

```
personal-portfolio-tracker/
├── personal-portfolio-tracker-frontend/  # Angular app
├── personal-portfolio-tracker-backend/   # Node/Express API
└── uploads/                              # Profile images
```

## Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/your-username/personal-portfolio-tracker.git
cd personal-portfolio-tracker
```

### 2. Backend Setup

```
cd personal-portfolio-tracker-backend
npm install
```

- Create a `.env` file:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
PORT=5000
```

- Start server:

```
node server.js
```

Make sure your IP is whitelisted in MongoDB Atlas.

### 3. Frontend Setup

```
cd personal-portfolio-tracker-frontend
npm install
```

- Set backend API URL in your environment files if needed:

```
// environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api'
};
```

- Start Angular app:

```
ng serve
```

## Testing the Flow

1. Visit http://localhost:4200
2. Sign up with profile image
3. Log in
4. View dashboard and portfolio chart
