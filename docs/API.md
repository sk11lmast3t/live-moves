# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Movie enthusiast",
  "language": "en",
  "theme": "dark"
}
```

### Content

#### Get All Content
```http
GET /content?type=movie&genre=action&search=query&page=1&limit=20
```

Query Parameters:
- `type`: movie | series | anime | music | documentary | education | shortfilm
- `genre`: filter by genre
- `search`: full-text search
- `page`: pagination page
- `limit`: items per page

#### Get Content by ID
```http
GET /content/:id
```

#### Get Trending
```http
GET /content/trending
```

#### Get Featured
```http
GET /content/featured
```

#### Get Recommendations
```http
GET /content/recommendations
Authorization: Bearer <token>
```

#### Rate Content
```http
POST /content/:id/rate
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4
}
```

### Watchlist

#### Get Watchlist
```http
GET /auth/watchlist
Authorization: Bearer <token>
```

#### Add to Watchlist
```http
POST /auth/watchlist/:contentId
Authorization: Bearer <token>
```

#### Remove from Watchlist
```http
DELETE /auth/watchlist/:contentId
Authorization: Bearer <token>
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "message": "Content not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

## Rate Limiting

- Limit: 100 requests per 15 minutes per IP
- Header: `X-RateLimit-Remaining`

## Examples

### Using cURL

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

Get Movies:
```bash
curl -X GET "http://localhost:5000/api/content?type=movie" \
  -H "Content-Type: application/json"
```

Rate Content:
```bash
curl -X POST "http://localhost:5000/api/content/507f1f77bcf86cd799439011/rate" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating": 5}'
```

### Using Axios (JavaScript)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Login
const { data } = await api.post('/auth/login', {
  email: 'john@example.com',
  password: 'securepassword'
});

// Set token for future requests
api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

// Get content
const content = await api.get('/content?type=movie');
```
