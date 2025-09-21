import { fetchAllWeatherData } from '../../lib/data'
import WeatherPage from '../../components/WeatherPage'

export const metadata = {
  title: 'Weather - TheQuiverIndia',
  description: 'Get comprehensive weather information for major Indian cities with detailed forecasts and live updates.',
}

export default async function Weather() {
  const weatherData = await fetchAllWeatherData()

  return <WeatherPage weatherData={weatherData} />
}
