# Installation & Setup Guide

## Prerequisites

- Node.js v18+ and npm
- MongoDB 5.0+ (local or MongoDB Atlas)
- Docker & Docker Compose (optional, for containerized setup)
- Git

## Step 1: Clone/Setup Project

```bash
cd streaming-app
```

## Step 2: Backend Setup

### Option A: Local Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure .env file:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/streaming-app
   JWT_SECRET=your-super-secret-key-here
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name streaming-db mongo:7.0
   
   # OR use MongoDB locally if installed
   mongod
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```

   Server will run on: `http://localhost:5000`

### Option B: Docker Setup

```bash
docker-compose up -d mongodb redis backend
```

## Step 3: Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure .env file:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=StreamBox
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Application will be available at: `http://localhost:5173`

## Step 4: Verify Setup

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```
   Expected response:
   ```json
   {"status":"OK","timestamp":"2024-01-01T00:00:00.000Z"}
   ```

2. **Frontend Access:**
   Open `http://localhost:5173` in your browser

## Step 5: Initial Data (Optional)

### Create test user via API:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## Complete Docker Setup

For full containerized environment:

```bash
# From root directory
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

This will start:
- MongoDB on port 27017
- Redis on port 6379
- Backend API on port 5000
- Frontend on port 5173

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running: `docker run -d -p 27017:27017 mongo:7.0`
- Or check MongoDB installation: `mongod`

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Or use different port in .env
PORT=5001
```

### CORS Error

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
- Ensure CORS_ORIGIN in backend .env matches frontend URL
- Default: `CORS_ORIGIN=http://localhost:5173`

### npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Development Commands

### Backend
```bash
npm run dev      # Start development server (with auto-reload)
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run linter
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

### Root (both frontend and backend)
```bash
npm run dev      # Start both dev servers
npm run build    # Build both
npm run lint     # Lint both
```

## Database Setup (Manual)

If using MongoDB locally without Docker:

```javascript
// Create admin user and database
use streaming-app;

db.createUser({
  user: "admin",
  pwd: "password123",
  roles: ["readWrite", "dbAdmin"]
});
```

## Next Steps

1. Create test content in MongoDB
2. Configure external APIs (TMDB, OmDB, etc.)
3. Set up authentication providers (Google OAuth, etc.)
4. Deploy to production environment

## Need Help?

- Check logs: `docker-compose logs backend`
- Review API documentation: [API.md](./API.md)
- Check environment variables: `cat backend/.env`
