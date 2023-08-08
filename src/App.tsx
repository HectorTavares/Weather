import './style.scss'
import React, { useEffect, useState } from 'react'
import { useWheaterApi, useCities } from '@/hooks'
import { CurrentWeatherData, DayWeatherData } from '@/types'
import { capitalizeWords } from '@/utils'

export default function App() {
  //TODO: entender os erros ao buildar pra poder fazer o deploy
  const { fetchAndCacheWeatherData } = useWheaterApi()
  const { updateCitiesList, updateCity, getCity, getCitiesList } = useCities()

  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>()
  const [nextDaysWeatherData, setNextDaysWeatherData] = useState<DayWeatherData[]>([])
  const [city, setCity] = useState<string>(getCity())
  const citiesOptions = getCitiesList()

  // const [isLoading, setIsLoading] = useState<boolean>(false)  utilizar quando criar loader

  const fetchData = async (city: string) => {
    try {
      const weatherData = await fetchAndCacheWeatherData(city)
      document.title = weatherData.currentWeatherData.location
      setCurrentWeatherData(weatherData.currentWeatherData)
      setNextDaysWeatherData(weatherData.nextDaysWeatherData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(city)
  }, [])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(capitalizeWords(event.target.value))
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    //TODO: testar se esta 100% e estilizar (esta fazendo a chamada quando apago o input)
    updateCitiesList(currentWeatherData!.location, city)
    updateCity(city)
    fetchData(city)
  }

  const handleOnSelectCity = (selectedCity: string): void => {
    updateCitiesList(city, selectedCity)
    updateCity(selectedCity)
    setCity(capitalizeWords(selectedCity))
    fetchData(capitalizeWords(selectedCity))
  }

  const renderMainInfos = () => {
    return (
      <div className='main-infos'>
        <div className='temperature-container'>
          <h2 className='temperature'>{currentWeatherData?.temperature} °</h2>
        </div>
        <div className='location-date-container'>
          <p className='location'>{currentWeatherData?.location}</p>
          <time className='date'>{currentWeatherData?.date}</time>
        </div>
        <div className='weather-status-container'>
          {currentWeatherData ? (
            <img
              className='weather-status-icon'
              src={currentWeatherData?.weatherStatus.icon}
              alt='teste'
              width={50}
              height={50}
            />
          ) : null}

          <p className='weather-status'>{currentWeatherData?.weatherStatus.description}</p>
        </div>
      </div>
    )
  }

  return (
    <main className='main'>
      <div className='main-infos-container'>{renderMainInfos()}</div>
      <aside className='sidebar'>
        <form className='form' onSubmit={handleOnSubmit}>
          <div className='form-top'>
            <input
              className='form-input'
              value={city}
              onChange={handleOnChange}
              type='text'
              placeholder='Another Location'
            />
            <button className='submit-button' type='submit'>
              <img className='submit-icon' src='/search.svg' alt='Logo' width={50} height={50} />
            </button>
          </div>

          <div className='searchCities'>
            {citiesOptions.map((searchCity) => {
              return (
                <button key={searchCity} onClick={() => handleOnSelectCity(searchCity)}>
                  {searchCity}
                </button>
              )
            })}
          </div>
        </form>
        <section className='weather-info'>
          <h2>Weather Details</h2>
          <div className='weather-info-line'>
            <p>Cloudy:</p> <p>{currentWeatherData?.cloudy}% </p>
          </div>
          <div>
            <p>Humidity:</p> <p> {currentWeatherData?.humidity}% </p>
          </div>
          <div>
            <p>Wind: </p> <p>{currentWeatherData?.windSpeed} m/s </p>
          </div>
          <div>
            <p>Wind Chill: </p> <p>{currentWeatherData?.temperatureApparent}° </p>
          </div>
        </section>
        {/* <> */}

        <section className='next-days-info'>
          <h2>Next Days</h2>
          {nextDaysWeatherData.map((dayWeatherData) => {
            return (
              <div className='day-info' key={dayWeatherData.day}>
                <p>{dayWeatherData.day}</p>
                <p>
                  {`
                  ${dayWeatherData.temperatureMax}° - 
                  ${dayWeatherData.temperatureMin}°`}
                </p>
                {/* TODO:usar figure e figCaption */}
                <figure className='weather-status-container'>
                  {dayWeatherData ? (
                    <img
                      className='weather-status-icon'
                      src={dayWeatherData?.weatherStatus.icon}
                      alt={`${dayWeatherData?.weatherStatus.description} icon`}
                      width={50}
                      height={50}
                    />
                  ) : null}

                  <figcaption className='weather-status'>
                    {dayWeatherData?.weatherStatus.description}
                  </figcaption>
                </figure>
              </div>
            )
          })}
        </section>
        {/* </> */}
      </aside>
    </main>
  )
}
