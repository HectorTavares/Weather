import './style.scss'
import React, { useEffect, useState } from 'react'
import { useWheaterApi, useCities } from '@/hooks'
import { CurrentWeatherData, DayWeatherData } from '@/types'
import { capitalizeWords } from '@/utils'
import { DayResumeInfo, Modal } from '@/components'
import { getClassByWeatherStatus } from './utils/getClassByWeatherStatus'

const avaliableLanguages = [
  { name: 'en_us', flag: './usa.png' },
  { name: 'pt_br', flag: './brazil.png' },
  { name: 'es_es', flag: './spain.png' },
]

export default function App() {
  const { fetchAndCacheWeatherData } = useWheaterApi()
  const { updateCitiesList, updateCity, getCity, getCitiesList } = useCities()

  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>()
  const [nextDaysWeatherData, setNextDaysWeatherData] = useState<DayWeatherData[]>([])
  const [city, setCity] = useState<string>(getCity())
  const citiesOptions = getCitiesList()
  const currentMainClassByStatus = getClassByWeatherStatus(
    currentWeatherData?.weatherStatus.description!
  )

  //TODO: utilizar quando criar loader
  // const [isLoading, setIsLoading] = useState<boolean>(false)

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
    event.preventDefault()
    setCity(capitalizeWords(event.target.value))
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
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

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const renderMainInfos = () => {
    return (
      <section className={`main-infos`}>
        <div className='temperature-container'>
          <h2 className='temperature'>{currentWeatherData?.temperature}°</h2>
        </div>
        <div className='location-date-container'>
          <p className='location'> {currentWeatherData?.location}</p>
          <p className='date'>{currentWeatherData?.date}</p>
        </div>
        <figure className='weather-status-container'>
          {currentWeatherData ? (
            <img
              className='weather-status-icon'
              src={currentWeatherData.weatherStatus.icon}
              alt={`${currentWeatherData.weatherStatus.description} icon`}
              width={75}
              height={75}
              loading='lazy'
              decoding='async'
            />
          ) : null}

          <figcaption className='weather-status'>
            {currentWeatherData?.weatherStatus.description}
          </figcaption>
        </figure>
      </section>
    )
  }

  return (
    <main
      className={`main ${
        currentWeatherData?.weatherStatus.description ? currentMainClassByStatus : ''
      } `}
    >
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div style={{ width: '320px', height: '500px' }}>
          <h2>Settings</h2>

          <div>
            <label>Language</label>
            {avaliableLanguages.map((language) => (
              <button>
                <figure>
                  <img className='flag' src={language.flag} alt={language.name} />
                  <figcaption>{language.name}</figcaption>
                </figure>
              </button>
            ))}
          </div>
        </div>
      </Modal>
      <div className='main-infos-container'>
        <div className='design-setting-container'>
          <a className='design' target='_blank' href='https://dribbble.com/thearthurk'>
            design by Arthur K
          </a>
          <button onClick={openModal} className='settings-button'>
            <img
              className='settings-icon'
              src='/settings.svg'
              alt='settings button'
              width={50}
              height={50}
              loading='lazy'
              decoding='async'
            />
          </button>
        </div>
        {renderMainInfos()}
      </div>
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
              <img
                className='submit-icon'
                src='/search.svg'
                alt='search button'
                width={50}
                height={50}
                loading='lazy'
                decoding='async'
              />
            </button>
          </div>

          <div className='searchCities'>
            {citiesOptions.map((searchCity) => {
              return (
                <button
                  className='searchCity-option '
                  key={searchCity}
                  onClick={() => handleOnSelectCity(searchCity)}
                >
                  {searchCity}
                </button>
              )
            })}
          </div>
        </form>
        <section className='weather-info'>
          <h2>Weather Details</h2>
          <div className='weather-info-line'>
            <p className='title'>Cloudy:</p> <p className='value'>{currentWeatherData?.cloudy}% </p>
          </div>

          <div className='weather-info-line'>
            <p className='title'>Humidity:</p>
            <p className='value'> {currentWeatherData?.humidity}% </p>
          </div>
          <div className='weather-info-line'>
            <p className='title'>Wind: </p>
            <p className='value'>{currentWeatherData?.windSpeed} m/s </p>
          </div>
          <div className='weather-info-line'>
            <p className='title'>Wind Chill: </p>
            <p className='value'>{currentWeatherData?.temperatureApparent}° </p>
          </div>
        </section>

        <section className='next-days-info'>
          <h2>Next Days</h2>

          {nextDaysWeatherData.map((dayWeatherData) => (
            <DayResumeInfo key={dayWeatherData.day} dayWeatherData={dayWeatherData} />
          ))}
        </section>
      </aside>
    </main>
  )
}
