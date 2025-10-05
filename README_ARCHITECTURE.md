# The Quiver - Architecture Documentation

## 📁 Project Structure

```
the-quiver/
├── app/                      # Next.js App Router pages
│   ├── layout.js            # Root layout with metadata
│   ├── page.js              # Homepage
│   ├── article/[slug]/      # Dynamic article pages
│   ├── category/[slug]/     # Dynamic category pages
│   ├── featured/            # Featured articles page
│   ├── saved/               # Saved articles page
│   ├── search/              # Search page
│   ├── weather/             # Weather page
│   ├── login/               # Login page
│   └── not-found.js         # 404 page
│
├── components/              # React components
│   ├── Header.js           # Main navigation header
│   ├── Footer.js           # Site footer
│   ├── ArticleCard.js      # Article preview card
│   ├── ArticleDetailPage.js # Full article view
│   ├── CategoryPage.js     # Category listing
│   ├── FeaturedPage.js     # Featured articles
│   ├── SearchPage.js       # Search interface
│   ├── SavedArticlesPage.js # Saved articles
│   ├── WeatherPage.js      # Weather display
│   ├── HeroCarousel.js     # Homepage carousel
│   ├── BreakingTicker.js   # Breaking news ticker
│   ├── WidgetPanel.js      # Dynamic sidebar widgets
│   ├── StaticWidgetPanel.js # Static sidebar widgets
│   ├── SidebarAdSlot.js    # Advertisement placeholder
│   ├── ClientOnly.js       # Client-side only wrapper
│   └── DynamicComponents.js # Dynamic imports config
│
├── lib/                     # Utilities and helpers
│   ├── constants.js        # Application constants
│   ├── data.js             # Mock data & API functions
│   ├── dateUtils.js        # Date formatting utilities
│   ├── hooks.js            # Custom React hooks
│   └── utils.js            # General utility functions
│
├── services/               # External services
│   └── authStub.js        # Authentication stub
│
├── styles/                # Styling
│   └── globals.css        # Global styles & Tailwind
│
└── public/                # Static assets (future)
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Presentation logic only
- **Lib**: Business logic and utilities
- **Services**: External integrations
- **App**: Routing and page composition

### 2. **Constants Management**
All hardcoded data is centralized in `lib/constants.js`:
- Site configuration
- Navigation items
- Social media links
- Category definitions
- Sort/view options
- Error/success messages
- Feature flags

### 3. **Data Layer**
Current: Mock data in `lib/data.js`
Future: Easy migration to real API

```javascript
// Current (Mock)
export async function fetchArticles() {
  return mockArticles
}

// Future (API)
export async function fetchArticles() {
  const response = await fetch(`${API_CONFIG.baseUrl}/articles`)
  return response.json()
}
```

### 4. **State Management**
- **Local State**: React useState for component state
- **Client Storage**: localStorage for persistence
- **Server State**: Next.js server components for data fetching

### 5. **Hydration Safety**
- Custom `useClientSide()` hook prevents hydration mismatches
- Dynamic imports for client-only components
- Consistent date formatting across server/client

## 🔧 Key Files Explained

### `lib/constants.js`
Central configuration file containing:
- Site metadata and branding
- Navigation structure
- Category definitions
- Social media links
- UI configuration (sort options, view modes)
- Feature flags for gradual rollout
- API endpoints (for future backend)
- Storage keys
- Error/success messages

**Benefits:**
- Single source of truth
- Easy to update branding
- Simplified backend migration
- Consistent UI across app

### `lib/utils.js`
Utility functions for:
- Social media share URL generation
- Number formatting (K/M suffixes)
- Text truncation
- Category color mapping
- Debouncing
- Safe localStorage operations
- Email validation
- Slug generation
- Reading time calculation

### `lib/data.js`
Mock data layer that simulates API:
- Article data
- Category data
- Weather data
- Stock market data
- Trending topics
- Live updates

**Migration Path:**
Replace mock functions with real API calls without changing component code.

### `lib/hooks.js`
Custom React hooks:
- `useClientSide()`: Prevents hydration mismatches
- `useLocalStorage()`: Safe localStorage with SSR

### `lib/dateUtils.js`
Date formatting utilities:
- Consistent date/time formatting
- Relative time display
- SSR-safe current year

## 🚀 Backend Integration Guide

### Step 1: Update API Configuration
```javascript
// lib/constants.js
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  endpoints: {
    articles: '/api/articles',
    categories: '/api/categories',
    // ... more endpoints
  }
}
```

### Step 2: Create API Client
```javascript
// lib/api.js
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.baseUrl}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  return response.json()
}
```

### Step 3: Update Data Functions
```javascript
// lib/data.js
export async function fetchArticles() {
  return apiRequest(API_CONFIG.endpoints.articles)
}
```

### Step 4: Add Authentication
```javascript
// lib/api.js
function getAuthHeaders() {
  const token = storage.get(STORAGE_KEYS.authToken)
  return token ? { Authorization: `Bearer ${token}` } : {}
}
```

## 📊 Admin Panel Integration

### Recommended Structure
```
admin/
├── app/
│   ├── dashboard/
│   ├── articles/
│   │   ├── list/
│   │   ├── create/
│   │   └── edit/[id]/
│   ├── categories/
│   ├── users/
│   └── settings/
└── components/
    ├── AdminLayout.js
    ├── ArticleEditor.js
    ├── MediaUploader.js
    └── ...
```

### Shared Resources
- Use same `lib/constants.js`
- Use same `lib/utils.js`
- Use same `lib/api.js`
- Separate admin-specific constants

## 🎨 Styling Architecture

### Tailwind CSS
- Utility-first approach
- Custom design tokens in `tailwind.config.js`
- Global styles in `styles/globals.css`

### Component Styling
- Inline Tailwind classes for flexibility
- Shared classes via constants
- Responsive design patterns

## 🔐 Security Considerations

### Current (Development)
- Mock authentication
- Client-side data storage
- No real API calls

### Production Requirements
1. **Authentication**
   - JWT tokens
   - Secure HTTP-only cookies
   - Token refresh mechanism

2. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - SQL injection prevention

3. **Data Protection**
   - Encrypt sensitive data
   - Secure localStorage usage
   - XSS prevention

## 📈 Performance Optimization

### Current Optimizations
- Next.js Image optimization
- Dynamic imports for code splitting
- Lazy loading for images
- Debounced search

### Future Optimizations
- Redis caching
- CDN for static assets
- Database query optimization
- API response caching

## 🧪 Testing Strategy

### Recommended Tests
1. **Unit Tests**
   - Utility functions
   - Date formatting
   - Data transformations

2. **Component Tests**
   - Rendering
   - User interactions
   - State management

3. **Integration Tests**
   - API calls
   - Authentication flow
   - Data persistence

4. **E2E Tests**
   - Critical user journeys
   - Article reading flow
   - Search functionality

## 🚀 Deployment

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.thequiver.com
NEXT_PUBLIC_SITE_URL=https://thequiver.com
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

### Build Process
```bash
npm run build
npm start
```

### Recommended Platforms
- **Vercel**: Optimal for Next.js
- **Netlify**: Good alternative
- **AWS/GCP**: For custom infrastructure

## 📝 Code Standards

### File Naming
- Components: PascalCase (e.g., `ArticleCard.js`)
- Utilities: camelCase (e.g., `dateUtils.js`)
- Constants: camelCase (e.g., `constants.js`)

### Component Structure
```javascript
// 1. Imports
import React from 'react'
import { CONSTANTS } from '../lib/constants'

// 2. Component
export default function Component({ props }) {
  // 3. State
  const [state, setState] = useState()
  
  // 4. Effects
  useEffect(() => {}, [])
  
  // 5. Handlers
  const handleClick = () => {}
  
  // 6. Render
  return <div>...</div>
}
```

### Best Practices
- Use constants instead of magic strings/numbers
- Extract reusable logic to utilities
- Keep components focused and small
- Use TypeScript for type safety (future)
- Document complex logic
- Handle errors gracefully

## 🔄 Migration Checklist

### From Mock to Real Backend
- [ ] Set up API endpoints
- [ ] Update `API_CONFIG` in constants
- [ ] Create API client in `lib/api.js`
- [ ] Replace mock functions in `lib/data.js`
- [ ] Add authentication
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Test all features
- [ ] Update environment variables
- [ ] Deploy and monitor

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated:** October 2025
**Version:** 1.0.0
