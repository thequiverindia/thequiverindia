export default function SidebarAdSlot({
  adSlot = 'sidebar-300x250',
  className = '',
  fallbackContent = null
}) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${className}`}
      role="img"
      aria-label="Advertisement space"
    >
      <div className="space-y-2">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <p className="text-sm text-gray-500">
          Ad Slot: {adSlot}
        </p>
        <p className="text-xs text-gray-400">
          300 × 250
        </p>
      </div>

      {fallbackContent && (
        <div className="mt-4 p-3 bg-white rounded border">
          {fallbackContent}
        </div>
      )}
    </div>
  )
}

