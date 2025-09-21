import '../styles/globals.css'

export const metadata = {
  title: 'The Quiver India - Breaking News & Analysis',
  description: 'Your trusted source for breaking news, in-depth analysis, and compelling stories from India and around the world.',
  keywords: 'news, india, politics, business, technology, breaking news, analysis',
  authors: [{ name: 'The Quiver India' }],
  creator: 'The Quiver India',
  publisher: 'The Quiver India',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thequiverindia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The Quiver India - Breaking News & Analysis',
    description: 'Your trusted source for breaking news, in-depth analysis, and compelling stories from India and around the world.',
    url: 'https://thequiverindia.com',
    siteName: 'The Quiver India',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Quiver India - Breaking News & Analysis',
    description: 'Your trusted source for breaking news, in-depth analysis, and compelling stories from India and around the world.',
    creator: '@thequiverindia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div id="root" className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
