import { DayWeatherData } from '@/types'

export const DayResumeInfo = ({ dayWeatherData }: { dayWeatherData: DayWeatherData }) => {
  return (
    <div className='day-info' key={dayWeatherData.day}>
      <p>{dayWeatherData.day}</p>
      <p>
        {`
      ${dayWeatherData.temperatureMax}° - 
      ${dayWeatherData.temperatureMin}°`}
      </p>
      <figure className='weather-status-container'>
        {/* {dayWeatherData ? ( */}
        <img
          className='weather-status-icon'
          src={dayWeatherData?.weatherStatus.icon}
          alt={`${dayWeatherData?.weatherStatus.description} icon`}
          width={50}
          height={50}
        />
        {/* // ) : null} */}

        <figcaption className='weather-status'>
          {dayWeatherData?.weatherStatus.description}
        </figcaption>
      </figure>
    </div>
  )
}
