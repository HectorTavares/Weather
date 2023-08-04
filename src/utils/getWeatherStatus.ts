interface WeatherStatus {
  description: string
  icon: string
}

interface WeatherCodeList {
  [key: number]: WeatherStatus
}

export const getWeatherStatus = (weatherCode: number): WeatherStatus => {
  const weatherCodeList: WeatherCodeList = {
    0: { description: 'Unknown', icon: '/icons/unknown.svg' },
    1000: { description: 'Clear', icon: '/icons/clear_day.svg' },
    1100: { description: 'Mostly Clear', icon: '/icons/mostly_clear_day.svg' },
    1101: {
      description: 'Partly Cloudy',
      icon: '/icons/partly_cloudy_day.svg',
    },
    1102: {
      description: 'Mostly Cloudy',
      icon: '/icons/mostly_cloudy.svg',
    },
    1001: { description: 'Cloudy', icon: '/icons/cloudy.svg' },
    2000: { description: 'Fog', icon: '/icons/fog.svg' },
    2100: { description: 'Light Fog', icon: '/icons/fog_light.svg' },
    4000: { description: 'Drizzle', icon: '/icons/drizzle.svg' },
    4001: { description: 'Rain', icon: '/icons/rain.svg' },
    4200: { description: 'Light Rain', icon: '/icons/rain_light.svg' },
    4201: { description: 'Heavy Rain', icon: '/icons/rain_heavy.svg' },
    5000: { description: 'Snow', icon: '/icons/snow.svg' },
    5001: { description: 'Flurries', icon: '/icons/flurries.svg' },
    5100: { description: 'Light Snow', icon: '/icons/snow_light.svg' },
    5101: { description: 'Heavy Snow', icon: '/icons/snow_heavy.svg' },
    6000: {
      description: 'Freezing Drizzle',
      icon: '/icons/freezing_drizzle.svg',
    },
    6001: { description: 'Freezing Rain', icon: '/icons/freezing_rain.svg' },
    6200: {
      description: 'Light Freezing Rain',
      icon: '/icons/freezing_rain_light.svg',
    },
    6201: {
      description: 'Heavy Freezing Rain',
      icon: '/icons/freezing_rain_heavy.svg',
    },
    7000: { description: 'Ice Pellets', icon: '/icons/ice_pellets.svg' },
    7101: {
      description: 'Heavy Ice Pellets',
      icon: '/icons/ice_pellets_heavy.svg',
    },
    7102: {
      description: 'Light Ice Pellets',
      icon: '/icons/ice_pellets_light.svg',
    },
    8000: { description: 'Thunderstorm', icon: '/icons/thunderstorm.svg' },
  }

  return weatherCodeList[weatherCode] || weatherCodeList[0]
}
