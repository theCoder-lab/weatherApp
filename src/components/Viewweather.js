import React from 'react'

const Viewweather = ({ desc, dateNum, dayIcon, tempHigh, tempLow }) => {

    dateNum = new Date(dateNum * 1000)
    dateNum.getDay()
    let options = { 
        weekday: 'short',
        month: '2-digit',
        day: '2-digit'
    }
    dateNum = Intl.DateTimeFormat('de-GR', options).format(dateNum)

    return (
    <div>
        <div className='day'>
            <img src={dayIcon} alt="weather-day" />
            <h3>{dateNum}</h3>
            <h5>( {desc} )</h5>
            <div className='temp-container'>
                <h5 className='temp-high'>
                    {tempHigh.toString().slice(0,2)} / {tempLow.toString().slice(0,2)} °C
                </h5>
            </div>
        </div>
    </div>
  )


}

export default Viewweather