# StreamBox - Full-Stack Streaming Application

A modern, scalable streaming platform for movies, TV shows, music, anime, and more. Built with Node.js, React, MongoDB, and advanced streaming technologies.

## Features

### 📺 Content Management
- Movies, TV Shows, Series, Anime, Music, Education, Kids Content
- Multiple quality options (480p, 720p, 1080p, 4K)
- Adaptive streaming with HLS/DASH
- Subtitle support in multiple languages

### 🔐 Authentication
- JWT-based authentication
- OAuth 2.0 integration (Google, Netflix-style)
- User profiles and preferences
- Parental controls

### 👤 User Features
- Personalized watchlist
- Continue watching tracking
- AI-powered recommendations
- Community features (ratings, reviews, comments)
- User history and collection management

### 🎨 UI/UX
- Responsive design (mobile, tablet, desktop)
- Dark/Light themes
- Search and filtering
- Genre-based discovery
- Trending and popular sections

### ⚙️ Architecture
- Microservices-ready backend
- RESTful API with GraphQL support
- Real-time notifications
- CDN-ready video streaming
- Scalable database with MongoDB

## Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (jsonwebtoken)
- **Streaming**: HLS.js, DASH.js support
- **Cache**: Redis (optional)
- **Queue**: Bull/RabbitMQ (for jobs)

### Frontend
- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: Context API + Redux (optional)
- **Video Player**: Video.js/HLS.js
- **HTTP Client**: Axios
- **Build Tool**: Vite

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Package Manager**: npm/yarn

## Project Structure

```
streaming-app/
├── backend/
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/      # Business logic
│   │   ├── models/          # Database schemas
│   │   ├── middleware/       # Auth, logging, etc.
│   │   ├── config/          # Configuration
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Entry point
│   ├── tests/               # Test files
│   ├── .env.example         # Environment template
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # Context providers
│   │   ├── utils/           # Utilities
│   │   ├── styles/          # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/              # Static assets
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── .github/
│   └── workflows/           # GitHub Actions
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Quick Start

### Prerequisites
- Node.js v18+ and npm
- MongoDB 5.0+
- Docker & Docker Compose (optional)

### Setup

1. **Clone and Install**
```bash
cd streaming-app
npm install
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
```

4. **Start Development**
```bash
# From root directory
npm run dev
# Backend will run on http://localhost:5000
# Frontend will run on http://localhost:5173
```

### Using Docker
```bash
docker-compose up -d
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/streaming-app
JWT_SECRET=your-secret-key-here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=StreamBox
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout user

### Content
- `GET /api/content/movies` - List movies
- `GET /api/content/shows` - List TV shows
- `GET /api/content/:id` - Get content details
- `GET /api/content/search?q=query` - Search content
- `GET /api/recommendations` - Get recommendations

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/watchlist` - Get watchlist
- `POST /api/user/watchlist/:contentId` - Add to watchlist
- `GET /api/user/history` - Get viewing history

### Streaming
- `GET /api/stream/:contentId/manifest.m3u8` - Get HLS stream
- `GET /api/stream/:contentId/subtitle` - Get subtitles

## Development Guidelines

### Code Style
- ESLint + Prettier for formatting
- 2-space indentation
- Meaningful variable names

### Testing
```bash
npm test
```

### Building
```bash
npm run build
```

## Deployment

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Set up CDN for media
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up logging and monitoring
- [ ] Enable rate limiting
- [ ] Configure backups

### Deploy to Production
```bash
# Using Docker
docker build -t streaming-app .
docker run -d streaming-app

# Or deploy to platforms: Vercel, Heroku, AWS, Azure, etc.
```

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- 📧 Email: support@streambox.com
- 🐛 GitHub Issues: [issues]
- 💬 Discord: [community]

---

**Start streaming, start building!** 🚀

## Deploy on Vercel

This repository is configured for Vercel **experimental services** (multi-service):
- `frontend` service (Vite app) at route prefix `/`
- `backend` service (Node/Express app) at route prefix `/_/backend`

### Required environment variables (Vercel Project Settings)

Backend service:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRE` (optional)
- `CORS_ORIGIN` (set to your frontend Vercel URL)

Frontend service:
- `VITE_API_URL` (optional; default `/_/backend/api`) **build-time variable**: Vite embeds `VITE_` variables during build, so changing this value requires a rebuild/redeploy (including Vercel redeploy).

### Vercel setup
1. Import the repository into Vercel.
2. Keep root directory as repository root.
3. Ensure the project uses `experimentalServices` from `vercel.json`.
4. Add env vars to the correct service scopes (frontend/backend).
5. Deploy and verify `/_/backend/health` and `/_/backend/api/content` (or your custom `VITE_API_URL` path).

