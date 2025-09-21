import Link from 'next/link'

export default function Footer({
  showSocial = true,
  showNewsletter = true,
  legalLinks = [],
  socialLinks = []
}) {
  const currentYear = new Date().getFullYear()

  const defaultLegalLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/advertise', label: 'Advertise' }
  ]

  const defaultSocialLinks = [
    { href: 'https://twitter.com/thequiver', label: 'Twitter', icon: 'twitter' },
    { href: 'https://facebook.com/thequiver', label: 'Facebook', icon: 'facebook' },
    { href: 'https://instagram.com/thequiver', label: 'Instagram', icon: 'instagram' }
  ]

  const linksToShow = legalLinks.length > 0 ? legalLinks : defaultLegalLinks
  const socialToShow = socialLinks.length > 0 ? socialLinks : defaultSocialLinks

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">The Quiver</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and compelling stories from India and around the world.
            </p>

            {showSocial && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-200 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialToShow.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon === 'twitter' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )}
                      {social.icon === 'facebook' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                      {social.icon === 'instagram' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.336-1.297C4.225 14.794 3.735 13.643 3.735 12.346s.49-2.448 1.297-3.336c.888-.807 2.039-1.297 3.336-1.297s2.448.49 3.336 1.297c.807.888 1.297 2.039 1.297 3.336s-.49 2.448-1.297 3.336c-.888.807-2.039 1.297-3.336 1.297z"/>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/politics" className="text-gray-300 hover:text-blue-400 transition-colors">Politics</Link></li>
              <li><Link href="/business" className="text-gray-300 hover:text-blue-400 transition-colors">Business</Link></li>
              <li><Link href="/technology" className="text-gray-300 hover:text-blue-400 transition-colors">Technology</Link></li>
              <li><Link href="/sports" className="text-gray-300 hover:text-blue-400 transition-colors">Sports</Link></li>
              <li><Link href="/world" className="text-gray-300 hover:text-blue-400 transition-colors">World</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {linksToShow.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div>
              <h3 className="text-sm font-semibold text-gray-200 mb-4">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-4">
                Get the latest news delivered to your inbox.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} The Quiver. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
              <Link href="/sitemap" className="text-gray-400 hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
              <Link href="/rss" className="text-gray-400 hover:text-blue-400 transition-colors">
                RSS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

