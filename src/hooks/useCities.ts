import { DEFAULT_CITIES_OPTIONS, DEFAULT_CITY } from '@/constants'

export function useCities() {
  function updateCitiesList(lastCity: string, newCity: string): void {
    const updatedCities = [...getCitiesList()]
    updatedCities.unshift(lastCity)

    if (updatedCities.includes(newCity)) {
      localStorage.setItem(
        'cities',
        JSON.stringify(updatedCities.filter((city) => city !== newCity))
      )
      return
    }

    updatedCities.pop()

    localStorage.setItem('cities', JSON.stringify(updatedCities))
  }

  function getCitiesList(): string[] {
    const localStorageCities = localStorage.getItem('cities')

    if (localStorageCities) {
      return JSON.parse(localStorageCities)
    }

    return DEFAULT_CITIES_OPTIONS
  }

  function updateCity(newCity: string): void {
    localStorage.setItem('city', newCity)
  }

  function getCity(): string {
    const city = localStorage.getItem('city')

    if (city) {
      return city
    }

    return DEFAULT_CITY
  }

  return {
    updateCitiesList,
    getCitiesList,
    updateCity,
    getCity,
  }
}
