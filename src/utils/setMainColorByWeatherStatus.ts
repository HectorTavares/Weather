export const setMainColorByWeatherClass = (weatherClass: string): void => {
  switch (weatherClass) {
    case 'clear':
      document.documentElement.style.setProperty('--primary-color', '#a9cee1')
      break
    case 'clear-cloudy':
      document.documentElement.style.setProperty('--primary-color', '#86c5e4')
      break
    case 'clouds':
      document.documentElement.style.setProperty('--primary-color', '#d66c05')
      break
    case 'fog':
      document.documentElement.style.setProperty('--primary-color', 'red')
      break
    case 'rain':
      document.documentElement.style.setProperty('--primary-color', 'red')
      break
    case 'snow':
      document.documentElement.style.setProperty('--primary-color', 'red')
      break
    case 'heavy-snow':
      document.documentElement.style.setProperty('--primary-color', 'red')
      break
    case 'ice':
      document.documentElement.style.setProperty('--primary-color', 'red')
      break
    case 'thunderstorm':
      document.documentElement.style.setProperty('--primary-color', 'red')
      break
    default:
  }
}
