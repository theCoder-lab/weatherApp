import React from 'react'
import { useState, useEffect } from 'react';
import Viewweather from './Viewweather';

//35afd3ecb2cead755e70c60281979de8


const Getweather = () => {

    const [weatherData, setWeatherData] = useState();

    /* const api = 'ffe63745a1e6cbad92e44b2bf6f0ea6a'; */
    const api = 'ffe63745a1e6cbad92e44b2bf6f0ea6a';

    const getWeatherData = () =>{
        if(!navigator.geolocation){
            console.log('Not working!');
        } else{
            navigator.geolocation.getCurrentPosition((position)=>{

                const apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&exclude=minutely&appid=${api}`

                fetch(apiURL)
                .then(res => res.json())
                .then(data => {
                    setWeatherData(data)
                })
                .catch(err => console.log(err.message))
            })
        }
    }

    useEffect(()=>{
        getWeatherData()
    },[])

    if(weatherData) console.log(weatherData);

    // Helper function to convert Fahrenheit to Celsius
    const convertToFahrenheit = (fahrenheit) => {
        const result = Math.floor(((fahrenheit - 32) * 5) / 9);
        return result;
    };
  return (
    <>
        <h1>Weather App - 5 days forecast</h1>
        <div className='container'>

            {
                weatherData ? weatherData.daily.slice(0, 7).map((day, index) => {
                        
                        //Convert Fahrenheit to Celsius
                        const tempHighCelsius = convertToFahrenheit(day.temp.max);
                        const tempLowCelsius = convertToFahrenheit(day.temp.min);

                        return <Viewweather key={index}
                            desc={day.weather[0].description}
                            dateNum={day.dt}
                            dayIcon={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                            tempHigh={tempHighCelsius}
                            tempLow={tempLowCelsius}
                        />
                    })
                : <h2>Loading...</h2>
            }
        </div>
    </>

  )
}

export default Getweather