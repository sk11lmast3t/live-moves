# StreamBox - Full-Stack Streaming Application 🎬

A complete, production-ready streaming platform built with modern web technologies. Stream movies, TV shows, anime, music, and more!

## 🚀 Features

- **🎥 Rich Content Library** - Movies, TV Shows, Series, Anime, Music, Documentaries, Education
- **🔐 Secure Authentication** - JWT-based user authentication with password hashing
- **👤 User Profiles** - Personalized watchlists, viewing history, and ratings
- **🎯 Smart Recommendations** - AI-powered content suggestions
- **🌙 Dark/Light Themes** - Beautiful, responsive UI with theme support
- **📱 Mobile Friendly** - Fully responsive design for all devices
- **⚡ High Performance** - Optimized backend and frontend with caching
- **🔍 Advanced Search** - Full-text search and filtering capabilities
- **🎬 Multiple Video Qualities** - Stream at 480p, 720p, 1080p, 4K
- **💬 Community Features** - Ratings, reviews, and comments

## 🛠 Tech Stack

### Backend
- **Node.js** + **Express.js** - Fast, scalable API server
- **MongoDB** + **Mongoose** - Document-based database with strong schema validation
- **JWT** - Secure stateless authentication
- **Redis** - Caching and session management (optional)

### Frontend
- **React 18** - Modern UI library with hooks and context
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - Promise-based HTTP client

### DevOps
- **Docker** & **Docker Compose** - Containerization and orchestration
- **GitHub Actions** - CI/CD pipeline
- **ESLint & Prettier** - Code quality and formatting

## 📋 Prerequisites

- **Node.js** v18+ and npm
- **MongoDB** 5.0+ (local or cloud)
- **Docker & Docker Compose** (optional)
- **Git** for version control

## ⚡ Quick Start

### 1. Clone and Setup
```bash
cd streaming-app
npm install
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev          # Start development server
```

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev          # Start dev server
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 🐳 Docker Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- MongoDB (port 27017)
- Redis (port 6379)
- Backend API (port 5000)
- Frontend (port 5173)

## 📚 Documentation

- [API Documentation](./docs/API.md) - Complete API reference
- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute

## 📁 Project Structure

```
streaming-app/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth & utilities
│   │   ├── config/          # Configuration
│   │   ├── utils/
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utilities
│   │   ├── styles/          # Tailwind styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docs/                    # Documentation
├── docker-compose.yml       # Docker configuration
├── package.json             # Root scripts
└── README.md               # This file
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register        - Create new account
POST   /api/auth/login           - Login user
GET    /api/auth/profile         - Get user profile
PUT    /api/auth/profile         - Update profile
```

### Content
```
GET    /api/content              - List all content
GET    /api/content/:id          - Get content details
GET    /api/content/trending     - Trending content
GET    /api/content/featured     - Featured content
GET    /api/content/recommendations - Personalized recommendations
POST   /api/content/:id/rate     - Rate content
```

### Watchlist
```
GET    /api/auth/watchlist       - Get watchlist
POST   /api/auth/watchlist/:id   - Add to watchlist
DELETE /api/auth/watchlist/:id   - Remove from watchlist
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/streaming-app
JWT_SECRET=your-secret-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=StreamBox
```

## 📊 Database Schemas

### User
- username, email, password
- profile (firstName, lastName, bio)
- watchlist, viewing history, ratings
- subscription info, preferences

### Content
- title, description, type (movie/series/anime/etc)
- genres, directors, cast, languages
- video qualities, subtitles
- rating, views, comments

### Comment
- contentId, userId, text, rating
- likes, dislikes, replies

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku login
heroku create streaming-app
git push heroku main
```

### Deploy to AWS/Azure
- Use Docker images from Dockerfile
- Set environment variables on hosting platform
- Configure database connection
- Set up CDN for media

## 🧪 Testing

### Backend
```bash
cd backend
npm test                # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Frontend
```bash
cd frontend
npm test
npm run test:watch
npm run test:coverage
```

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#1a1a1a',
  secondary: '#e50914',
  accent: '#f5a623',
}
```

### Add Content Types
Edit `backend/src/models/Content.js`:
```javascript
type: {
  enum: ['movie', 'series', 'anime', 'music', 'your_type']
}
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running: `docker run -d -p 27017:27017 mongo:7.0` |
| Port already in use | Change PORT in .env or kill process: `lsof -ti:5000 \| xargs kill -9` |
| CORS error | Check CORS_ORIGIN matches frontend URL |
| npm install fails | Clear cache: `npm cache clean --force` |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details

## 🙏 Acknowledgments

- Inspired by popular streaming platforms
- Built with modern, production-ready technologies
- Community-driven development

## 📞 Support

- 📧 **Email**: support@streambox.example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/streaming-app/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/streaming-app/discussions)

---

**Ready to stream?** Start with the [Quick Start](#-quick-start) section above! 🚀

Made with ❤️ by the StreamBox Team
