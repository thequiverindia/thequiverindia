# The Quiver Backend API

Professional, scalable backend API for The Quiver India news platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6.0+ (local or MongoDB Atlas)

**Note:** Cloudinary is no longer required! Images are stored as base64 in MongoDB.

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   - MongoDB connection string
   - JWT secrets
   - Frontend/Admin URLs
   
**Note:** Cloudinary credentials are optional. Images are stored as base64 in MongoDB by default.

4. **Seed the database**
   ```bash
   npm run seed
   ```
   
   This will create:
   - Admin user (admin@thequiver.com / Admin@123)
   - Author user (rajesh@thequiver.com / Author@123)
   - Sample categories
   - Sample articles

5. **Start development server**
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── article.controller.js # Article CRUD
│   ├── category.controller.js # Category management
│   └── ad.controller.js     # Advertisement management
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Input validation
├── models/
│   ├── User.model.js        # User schema
│   ├── Article.model.js     # Article schema
│   ├── Category.model.js    # Category schema
│   └── Ad.model.js          # Advertisement schema
├── routes/
│   ├── auth.routes.js       # Auth endpoints
│   ├── article.routes.js    # Article endpoints
│   ├── category.routes.js   # Category endpoints
│   ├── ad.routes.js         # Ad endpoints
│   ├── user.routes.js       # User management
│   ├── media.routes.js      # File uploads
│   ├── analytics.routes.js  # Analytics data
│   ├── weather.routes.js    # Weather data
│   └── trending.routes.js   # Trending topics
├── scripts/
│   └── seed.js              # Database seeding
├── server.js                # Express app setup
├── package.json
└── .env.example
```

## 🔐 Authentication

### User Roles
- **user**: Regular users (can read, comment, save articles)
- **author**: Can create and edit own articles
- **editor**: Can edit all articles
- **admin**: Full access to all features

### JWT Tokens
- **Access Token**: Short-lived (7 days), used for API requests
- **Refresh Token**: Long-lived (30 days), used to get new access tokens

### Protected Routes
Include JWT token in Authorization header:
```
Authorization: Bearer <your-token>
```

## 📡 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /refresh` - Refresh access token
- `GET /me` - Get current user (protected)
- `PUT /profile` - Update profile (protected)
- `PUT /password` - Change password (protected)
- `POST /logout` - Logout (protected)

### Articles (`/api/v1/articles`)
- `GET /` - Get all articles (public)
- `GET /search` - Search articles (public)
- `GET /trending` - Get trending articles (public)
- `GET /featured` - Get featured articles (public)
- `GET /:slug` - Get article by slug (public)
- `POST /` - Create article (author+)
- `PUT /:id` - Update article (author+)
- `DELETE /:id` - Delete article (editor+)
- `POST /:id/share` - Increment shares (public)
- `POST /:id/like` - Toggle like (protected)
- `POST /:id/comments` - Add comment (protected)

### Categories (`/api/v1/categories`)
- `GET /` - Get all categories (public)
- `GET /:slug` - Get category by slug (public)
- `GET /:slug/articles` - Get articles by category (public)
- `POST /` - Create category (admin)
- `PUT /:id` - Update category (admin)
- `DELETE /:id` - Delete category (admin)

### Advertisements (`/api/v1/ads`)
- `GET /` - Get active ads (public)
- `POST /:id/impression` - Track impression (public)
- `POST /:id/click` - Track click (public)
- `GET /all` - Get all ads (admin)
- `GET /:id` - Get ad by ID (admin)
- `POST /create` - Create ad (admin)
- `PUT /:id` - Update ad (admin)
- `DELETE /:id` - Delete ad (admin)
- `GET /:id/analytics` - Get ad analytics (admin)

### Users (`/api/v1/users`)
- `GET /` - Get all users (admin)
- `GET /:id` - Get user by ID (admin)
- `PUT /:id` - Update user (admin)
- `DELETE /:id` - Delete user (admin)

### Media (`/api/v1/media`)
- `POST /upload` - Upload single image (author+)
- `POST /upload-multiple` - Upload multiple images (author+)
- `DELETE /:publicId` - Delete image (author+)

### Analytics (`/api/v1/analytics`)
- `GET /dashboard` - Get dashboard stats (admin)
- `GET /articles` - Get article analytics (admin)

### Weather (`/api/v1/weather`)
- `GET /` - Get all cities weather (public)
- `GET /:city` - Get city weather (public)

### Trending (`/api/v1/trending`)
- `GET /topics` - Get trending topics (public)
- `GET /live-updates` - Get live updates (public)
- `GET /stocks` - Get stock market data (public)

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ] // For validation errors
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "articles": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 100,
      "totalPages": 9,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **JWT**: Secure authentication
- **Password Hashing**: bcrypt
- **Input Validation**: express-validator
- **Account Locking**: After failed login attempts
- **XSS Protection**: Sanitized inputs

## 📊 Database Models

### User
- Authentication and profile
- Role-based access control
- Social links and preferences
- Account security features

### Article
- Full article content and metadata
- Author and category relationships
- SEO optimization fields
- Multimedia support
- Comments system
- Analytics (views, shares, likes)

### Category
- Category management
- SEO fields
- Hierarchical support
- Active/inactive status

### Ad
- Advertisement management
- Scheduling and targeting
- Performance tracking
- CTR analytics

## 🧪 Testing

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@thequiver.com",
    "password": "Admin@123"
  }'
```

### Test Get Articles
```bash
curl http://localhost:5000/api/v1/articles
```

### Test Create Article (with token)
```bash
curl -X POST http://localhost:5000/api/v1/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Test Article",
    "excerpt": "This is a test article excerpt that is at least 50 characters long.",
    "content": "This is the full content of the test article. It needs to be at least 100 characters long to pass validation.",
    "category": "<category-id>",
    "image": {
      "url": "https://picsum.photos/1200/800"
    }
  }'
```

## 🚀 Deployment

### Environment Variables
Set these in production:
- `NODE_ENV=production`
- `MONGODB_URI_PROD=<your-production-mongodb-uri>`
- `JWT_SECRET=<strong-secret-key>`
- `FRONTEND_URL=<your-frontend-url>`

### Build and Run
```bash
npm start
```

### Recommended Platforms
- **Railway**: Easy deployment with MongoDB
- **Heroku**: Classic PaaS
- **DigitalOcean**: App Platform
- **AWS**: EC2 + RDS/DocumentDB
- **Vercel**: Serverless functions

## 📈 Performance Tips

1. **Indexing**: All models have proper indexes
2. **Pagination**: Use for large datasets
3. **Caching**: Implement Redis for frequently accessed data
4. **Image Storage**: Currently uses base64 in MongoDB (free), optionally use CDN for scale
5. **Compression**: Enabled by default
6. **Query Optimization**: Use lean() for read-only operations

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check MongoDB is running: `mongosh`
- Verify connection string in `.env`
- Check network access (for Atlas)

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure user is active and verified

### Image Upload Issues
- Check file size limits (5MB max)
- Ensure correct file format (JPEG, PNG, WebP, GIF only)
- Verify user is authenticated
- Check backend logs for detailed errors

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Base64 Encoding](https://developer.mozilla.org/en-US/docs/Glossary/Base64)

## 🤝 Contributing

1. Follow the established code structure
2. Add validation for all inputs
3. Include error handling
4. Document new endpoints
5. Write tests for new features

---

**Version:** 1.0.0
**Last Updated:** October 2025

