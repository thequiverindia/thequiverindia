'use client'

import { useState, useEffect } from 'react'
import { fetchWeatherByCity } from '../lib/data'
import Header from './Header'
import Footer from './Footer'

const majorIndianCities = [
  { name: 'New Delhi', key: 'delhi', state: 'Delhi' },
  { name: 'Mumbai', key: 'mumbai', state: 'Maharashtra' },
  { name: 'Bangalore', key: 'bangalore', state: 'Karnataka' },
  { name: 'Chennai', key: 'chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', key: 'kolkata', state: 'West Bengal' },
  { name: 'Hyderabad', key: 'hyderabad', state: 'Telangana' },
  { name: 'Pune', key: 'pune', state: 'Maharashtra' },
  { name: 'Ahmedabad', key: 'ahmedabad', state: 'Gujarat' }
]

const weatherIcons = {
  'sunny': '☀️',
  'partly-cloudy': '⛅',
  'cloudy': '☁️',
  'rainy': '🌧️',
  'stormy': '⛈️',
  'humid': '🌫️',
  'hot': '🥵',
  'cold': '🥶'
}

const getWeatherIcon = (condition) => {
  const key = condition.toLowerCase().replace(/\s+/g, '-')
  return weatherIcons[key] || '🌤️'
}

const UVIndexBar = ({ uvIndex }) => {
  const getUVColor = (uv) => {
    if (uv <= 2) return 'bg-green-500'
    if (uv <= 5) return 'bg-yellow-500'
    if (uv <= 7) return 'bg-orange-500'
    if (uv <= 10) return 'bg-red-500'
    return 'bg-purple-500'
  }

  const getUVLabel = (uv) => {
    if (uv <= 2) return 'Low'
    if (uv <= 5) return 'Moderate'
    if (uv <= 7) return 'High'
    if (uv <= 10) return 'Very High'
    return 'Extreme'
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>UV Index</span>
        <span className="font-medium">{uvIndex} - {getUVLabel(uvIndex)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getUVColor(uvIndex)}`}
          style={{ width: `${Math.min((uvIndex / 11) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  )
}

export default function WeatherPage({ weatherData: initialWeatherData }) {
  const [selectedCity, setSelectedCity] = useState('delhi')
  const [weatherData, setWeatherData] = useState(initialWeatherData)
  const [currentWeather, setCurrentWeather] = useState(initialWeatherData.delhi)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCityChange = async (cityKey) => {
    if (cityKey === selectedCity) return
    
    setLoading(true)
    setSelectedCity(cityKey)
    
    try {
      // If we don't have data for this city, fetch it
      if (!weatherData[cityKey]) {
        const newWeatherData = await fetchWeatherByCity(cityKey)
        setWeatherData(prev => ({ ...prev, [cityKey]: newWeatherData }))
        setCurrentWeather(newWeatherData)
      } else {
        setCurrentWeather(weatherData[cityKey])
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCities = majorIndianCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Weather in India</h1>
          <p className="text-lg text-gray-600">Get comprehensive weather information for major Indian cities</p>
        </div>

        {/* City Search and Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="city-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search for a city
            </label>
            <input
              id="city-search"
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {filteredCities.map((city) => (
              <button
                key={city.key}
                onClick={() => handleCityChange(city.key)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedCity === city.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div>{city.name}</div>
                <div className="text-xs opacity-75">{city.state}</div>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : currentWeather ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Weather - Main Panel */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold">{currentWeather.city}</h2>
                    <p className="text-blue-100">{currentWeather.state}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold">{currentWeather.temperature}°C</div>
                    <div className="text-xl text-blue-100">{currentWeather.condition}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <span className="text-8xl">{getWeatherIcon(currentWeather.condition)}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl mb-1">💧</div>
                    <div className="text-sm text-blue-100">Humidity</div>
                    <div className="font-bold">{currentWeather.humidity}%</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl mb-1">💨</div>
                    <div className="text-sm text-blue-100">Wind Speed</div>
                    <div className="font-bold">{currentWeather.windSpeed} km/h</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl mb-1">👁️</div>
                    <div className="text-sm text-blue-100">Visibility</div>
                    <div className="font-bold">{currentWeather.visibility} km</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="text-sm text-blue-100">Pressure</div>
                    <div className="font-bold">{currentWeather.pressure} hPa</div>
                  </div>
                </div>
              </div>

              {/* Extended Forecast */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3-Day Forecast</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentWeather.forecast?.map((day, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-2">{day.day}</div>
                      <div className="text-4xl mb-2">{getWeatherIcon(day.condition)}</div>
                      <div className="text-sm text-gray-600 mb-2">{day.condition}</div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{day.high}°</span>
                        <span className="text-gray-500">{day.low}°</span>
                      </div>
                    </div>
                  )) || (
                    <div className="col-span-3 text-center text-gray-500">
                      Forecast data not available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Weather Details Sidebar */}
            <div className="space-y-6">
              {/* UV Index */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">UV Index</h3>
                <UVIndexBar uvIndex={currentWeather.uvIndex || 5} />
              </div>

              {/* Weather Map Placeholder */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Weather Map</h3>
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-600">Interactive weather map</p>
                    <p className="text-sm text-gray-500">(Coming soon)</p>
                  </div>
                </div>
              </div>

              {/* Weather Alerts */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Weather Alerts</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-yellow-600 mr-2">⚠️</span>
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Heat Wave Warning</p>
                        <p className="text-xs text-yellow-600">Temperature may exceed 40°C</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">💧</span>
                      <div>
                        <p className="text-sm font-medium text-blue-800">Monsoon Update</p>
                        <p className="text-xs text-blue-600">Light to moderate rain expected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Air Quality */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Air Quality</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AQI</span>
                    <span className="font-bold text-orange-600">156</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <p className="text-sm text-orange-600 font-medium">Moderate</p>
                  <p className="text-xs text-gray-500">
                    Air quality is acceptable for most people. Sensitive individuals should consider limiting prolonged outdoor exposure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">Weather data not available</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
