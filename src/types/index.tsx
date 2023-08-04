export interface WeatherStatus {
  description: string
  icon: string
}

export interface CurrentWeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  temperatureApparent: number
  weatherStatus: WeatherStatus
  date: string
  location: string
  cloudy: number
}

export interface DayWeatherData {
  weatherStatus: WeatherStatus
  temperatureMax: number
  temperatureMin: number
  day: string
}

export interface WeatherData {
  currentWeatherData: CurrentWeatherData
  nextDaysWeatherData: DayWeatherData[]
}
