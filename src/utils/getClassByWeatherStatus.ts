interface WeatherMapping {
  [key: string]: string
}

export const getClassByWeatherStatus = (weatherStatus: string): string => {
  const weatherMapping: WeatherMapping = {
    Clear: 'clear',
    'Mostly Clear': 'clear-cloudy',
    'Partly Cloudy': 'clear-cloudy',
    'Mostly Cloudy': 'clouds',
    Cloudy: 'clouds',
    Fog: 'fog',
    'Light Fog': 'fog',
    Drizzle: 'rain',
    Rain: 'rain',
    'Light Rain': 'rain',
    'Heavy Rain': 'rain',
    Snow: 'snow',
    Flurries: 'snow',
    'Light Snow': 'snow',
    'Freezing Drizzle': 'snow',
    'Light Freezing Rain': 'snow',
    'Heavy Snow': 'heavy-snow',
    'Freezing Rain': 'heavy-snow',
    'Heavy Freezing Rain': 'heavy-snow',
    'Ice Pellets': 'ice',
    'Heavy Ice Pellets': 'ice',
    'Light Ice Pellets': 'ice',
    Thunderstorm: 'thunderstorm',
  }

  return weatherMapping[weatherStatus] || ''
}

/*
const weatherCodeList = {
  1000: 'clear',
  1100: 'mostly-clear',
  1101: 'partly-cloudy',
  1102: 'mostly-cloudy',
  1001: 'cloudy',
  2000: 'fog',
  2100: 'light-fog',
  4000: 'drizzle',
  4001: 'rain',
  4200: 'light-rain',
  4201: 'heavy-rain',
  5000: 'snow',
  5001: 'flurries',
  5100: 'light-snow',
  5101: 'heavy-snow',
  6000: 'freezing-drizzle',
  6001: 'freezing-rain',
  6200: 'light-freezing-rain',
  6201: 'heavy-freezing-rain',
  7000: 'ice-pellets',
  7101: 'heavy-ice-pellets',
  7102: 'light-ice-pellets',
  8000: 'thunderstorm',
};


*/
