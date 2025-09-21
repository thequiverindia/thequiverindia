# 🚀 TheQuiverIndia - Next.js News Platform

A modern, fully-featured news platform built with Next.js 14, Tailwind CSS, and modern web technologies. Features a beautiful design, comprehensive component library, and production-ready architecture.

## ✨ Features

### 🎨 **Modern Design System**
- Clean, professional "Modern Trust" visual identity
- Mobile-first responsive design
- Accessible components (WCAG AA compliant)
- Smooth animations and micro-interactions

### 📰 **Core Functionality**
- **Homepage**: Hero carousel, featured articles, sidebar widgets
- **Article Pages**: Full article view with related content
- **Category Pages**: Grid layout with filtering and pagination
- **Authentication**: Email/password and Google OAuth (stub)
- **Search**: Real-time article search functionality

### 🔧 **Technical Stack**
- **Next.js 14**: App Router with server components
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **React 18**: Modern React with hooks and server components
- **Mock API**: Comprehensive REST API with realistic data
- **TypeScript Ready**: Easy migration path

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Basic knowledge of React and Next.js

### Installation

1. **Clone or Download** the project files to a directory

2. **Install Dependencies**
   ```bash
   cd thequiverindia
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

### Default Login Credentials
- **Email**: `user@example.com`
- **Password**: `password123`

## 📁 Project Structure

```
thequiverindia/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Homepage
│   ├── login/             # Login page
│   └── globals.css        # Global styles
├── components/            # React component library
│   ├── Header.js         # Main navigation
│   ├── ArticleCard.js    # Article preview component
│   ├── HeroCarousel.js   # Featured content carousel
│   ├── BreakingTicker.js # Breaking news banner
│   ├── WidgetPanel.js    # Sidebar widgets container
│   ├── SidebarAdSlot.js  # Advertisement placeholder
│   └── Footer.js         # Site footer
├── lib/                  # Utilities and data
│   └── data.js          # Mock data fetching functions
├── services/            # External services
│   └── authStub.js      # Authentication mocks
├── styles/              # Styling files
│   └── globals.css      # Tailwind CSS imports
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── next.config.js       # Next.js configuration
└── postcss.config.js    # PostCSS configuration
```

## 🎯 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero carousel and featured content |
| `/login` | Full-screen login page |
| `/article/[slug]` | Individual article pages |
| `/category/[slug]` | Category listing pages |

## 🛠️ Development

### Adding New Components
1. Create component in `/components/` directory
2. Use the established design system (Tailwind classes)
3. Follow accessibility guidelines
4. Export as default function

### API Integration
- All API routes return mock data
- Easy to replace with real endpoints
- Consistent data structure across endpoints
- Pagination support included

### Styling Guidelines
- Use Tailwind utility classes
- Follow the design token system
- Maintain responsive design principles
- Ensure accessibility compliance

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0ea5e9`
- **Navy**: `#1a365d`
- **Dark Gray**: `#2d3748`
- **Neutral Grays**: Various shades for hierarchy

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading Sizes**: text-2xl, text-3xl, text-4xl
- **Body Text**: text-base (16px)
- **Line Height**: 1.6 for readability

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 16, 24, 32, 48, 64px
- **Container Max Width**: 1280px (80rem)

## 🔐 Authentication

### Login Options
1. **Email/Password**: `user@example.com` / `password123`
2. **Google OAuth**: Click Google button (returns mock data)
3. **Guest Mode**: Continue without authentication

### Session Management
- JWT tokens stored in localStorage
- Automatic redirect after login
- Guest mode for limited access

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Grid System**: CSS Grid and Flexbox
- **Images**: Responsive with Next.js Image component

## ♿ Accessibility

- **WCAG AA Compliant**: Proper contrast ratios
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Alternative Text**: Descriptive alt text for images

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel automatically
```

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Follow the established code style
2. Use TypeScript for new components
3. Add proper error handling
4. Include accessibility features
5. Write clear component documentation

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🆘 Support

For questions or issues:
- Check the component documentation
- Review the API structure in `/lib/data.js`
- Ensure all dependencies are installed
- Verify Next.js and React versions

---

**Built with ❤️ for TheQuiverIndia**

A modern news platform combining beautiful design, robust functionality, and developer-friendly architecture.

