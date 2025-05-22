
# Welcome to StayOnTrack

## Project info

**URL**: https://lovable.dev/projects/e7c4a01c-4ee6-4713-a268-5b68599e8240

## How to run the application

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Setup MongoDB
1. Create a MongoDB Atlas account or use a local MongoDB installation
2. Create a new cluster and database
3. Get your MongoDB connection string
4. Create a `.env` file in the server directory using the `.env.example` template
5. Add your MongoDB connection string to the `.env` file

### Run the backend server
```sh
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the server in development mode
npm run dev
```

### Run the frontend
```sh
# In a new terminal, navigate to the project root directory
# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on http://localhost:5173 and the backend will run on http://localhost:5000.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [StayOnTrack Lovable Project](https://lovable.dev/projects/e7c4a01c-4ee6-4713-a268-5b68599e8240) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Deployment Instructions

To deploy this application:

1. Deploy the MongoDB database:
   - Use MongoDB Atlas for cloud hosting
   - Configure environment variables for production

2. Deploy the Express.js backend:
   - Deploy to platforms like Heroku, Railway, or Render
   - Set the environment variables for production

3. Deploy the React frontend:
   - Build the frontend: `npm run build`
   - Deploy to platforms like Netlify, Vercel, or GitHub Pages
   - Update the API_URL in the frontend code to point to your deployed backend

4. Connect the frontend to the backend:
   - Update the CORS settings in the backend to allow requests from your frontend domain

## Project Structure

- `/src` - Frontend React application
- `/server` - Backend Express.js application
  - `/models` - MongoDB models
  - `/routes` - API routes
  - `server.js` - Main server file

## What technologies are used for this project?

This project is built with:

- Frontend:
  - Vite
  - React
  - shadcn-ui
  - Tailwind CSS
  - React Router

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
