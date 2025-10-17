# The Quiver Admin Panel

A comprehensive admin panel for managing The Quiver news platform, built with Next.js 14, React, and Tailwind CSS.

## 🚀 Features

### 📊 Dashboard
- **Analytics Overview**: Total articles, views, users, and ads
- **Visual Charts**: Pie charts for article categories, bar charts for activity trends
- **Recent Articles**: Quick access to latest published articles
- **Top Authors**: Performance metrics for content creators
- **Quick Actions**: Direct links to create articles, manage categories, ads, and users

### 📰 Article Management
- **Rich Text Editor**: Full-featured WYSIWYG editor with React Quill
- **Image Upload**: Integrated media upload with Cloudinary
- **SEO Optimization**: Meta titles, descriptions, and keywords
- **Content Organization**: Categories, tags, locations, and regions
- **Publishing Options**: Draft, published, scheduled, and archived statuses
- **Priority System**: Low, medium, high, and critical priority levels
- **Featured Content**: Mark articles as featured or breaking news
- **Scheduled Publishing**: Set future publication dates

### 📂 Category Management
- **Visual Categories**: Color-coded categories with icons
- **Full CRUD Operations**: Create, read, update, and delete categories
- **Status Management**: Activate/deactivate categories
- **Article Counts**: Track articles per category

### 👥 User Management
- **Role-Based Access**: User, Author, Editor, and Admin roles
- **User Profiles**: Manage user information and permissions
- **Status Control**: Activate/deactivate user accounts
- **Role Assignment**: Change user roles and permissions
- **Pagination**: Handle large user bases efficiently

### 📢 Advertisement Management
- **Ad Types**: Banner, sidebar, in-article, popup, and native ads
- **Multiple Sizes**: Standard ad sizes (728x90, 300x250, etc.)
- **Placement Control**: Homepage, article, category, search, or all pages
- **Advertiser Information**: Company details and contact information
- **Targeting Options**: Device, category, and regional targeting
- **Scheduling**: Start and end dates with timezone support
- **Performance Tracking**: Views, clicks, and CTR metrics
- **Priority System**: Low, normal, and high priority levels

### 🖼️ Media Library
- **File Upload**: Multiple image upload support
- **Grid/List Views**: Toggle between different viewing modes
- **Search & Filter**: Find media files quickly
- **File Management**: Copy URLs, delete files
- **File Information**: Size, type, and upload date tracking

### 📈 Analytics
- **Performance Metrics**: Views, shares, likes tracking
- **Visual Charts**: Area charts, bar charts, and pie charts
- **Date Range Filtering**: 7 days, 30 days, 90 days, 1 year
- **Top Content**: Best performing articles by various metrics
- **Category Analysis**: Content distribution across categories
- **Engagement Tracking**: User activity and content interaction

### ⚙️ Settings
- **General Settings**: Site name, tagline, description, timezone
- **Profile Management**: Admin profile updates
- **Email Configuration**: SMTP settings for notifications
- **Social Media**: Platform URLs and handles
- **SEO Settings**: Meta tags, keywords, and social media cards
- **Security Options**: Session timeout, password requirements, 2FA
- **Notification Preferences**: Email and push notification settings

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Rich Text Editor**: React Quill
- **Charts**: Recharts
- **Icons**: React Icons
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **Authentication**: JWT tokens with localStorage
- **File Upload**: Cloudinary integration

## 📁 Project Structure

```
admin/
├── app/                    # Next.js App Router pages
│   ├── ads/               # Advertisement management
│   │   ├── create/        # Create new ad
│   │   └── [id]/edit/     # Edit existing ad
│   ├── analytics/         # Analytics dashboard
│   ├── articles/          # Article management
│   │   ├── create/        # Create new article
│   │   └── [id]/edit/     # Edit existing article
│   ├── categories/        # Category management
│   ├── dashboard/         # Main dashboard
│   ├── login/             # Authentication
│   ├── media/             # Media library
│   ├── settings/          # Platform settings
│   ├── users/             # User management
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable components
│   ├── AdminLayout.js     # Main layout wrapper
│   ├── AdEditor.js        # Advertisement editor
│   └── ArticleEditor.js   # Article editor
├── lib/                   # Utilities and configuration
│   ├── api.js            # API client
│   ├── constants.js      # Application constants
│   └── utils.js          # Utility functions
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS imports
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on port 5000

### Installation

1. **Install dependencies**:
   ```bash
   cd admin
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Access Admin Panel**:
   Open [http://localhost:3001](http://localhost:3001) in your browser

### Default Login
- **Email**: admin@thequiver.com
- **Password**: admin123

## 🔧 Configuration

### API Integration
The admin panel communicates with the backend API through the `lib/api.js` file. All API endpoints are centralized and handle authentication automatically.

### Media Upload
Image uploads are handled through Cloudinary. Configure your Cloudinary credentials in the backend environment variables.

### Authentication
JWT tokens are stored in localStorage and automatically attached to API requests. The system supports token refresh for seamless user experience.

## 📱 Responsive Design

The admin panel is fully responsive and works seamlessly across:
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Collapsible sidebar with touch-friendly controls
- **Mobile**: Mobile-first design with hamburger menu

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Different permission levels for users
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized rich text content
- **CSRF Protection**: Secure form submissions
- **Rate Limiting**: API request throttling

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark/Light Mode**: Theme switching capability
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Success Notifications**: Toast notifications for actions
- **Keyboard Shortcuts**: Power user productivity features
- **Accessibility**: WCAG 2.1 compliant components

## 🔄 Workflow

### Content Creation Workflow
1. **Create Article**: Use the rich text editor to write content
2. **Upload Media**: Add featured images and inline media
3. **Set Metadata**: Configure SEO, categories, and tags
4. **Schedule Publishing**: Set publication date and time
5. **Review & Publish**: Preview content before going live

### Advertisement Workflow
1. **Create Campaign**: Set up advertisement details
2. **Upload Creative**: Add advertisement images
3. **Configure Targeting**: Set audience and placement rules
4. **Schedule Campaign**: Define start and end dates
5. **Monitor Performance**: Track views, clicks, and conversions

## 📊 Analytics & Reporting

- **Real-time Metrics**: Live data from the platform
- **Historical Data**: Trends over time
- **Export Options**: CSV and PDF report generation
- **Custom Dashboards**: Personalized analytics views
- **Performance Alerts**: Automated notifications for anomalies

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs through GitHub issues
- **Community**: Join our Discord server

---

Built with ❤️ for The Quiver News Platform