import React,{ useEffect, useState } from "react";
import axios from "axios";
import './App.css'

  const Weather = () => {
    const [city, setCity ] = useState ('');
    const [weatherData, setWeatherData] = useState (null);

    const fetchData = async () => {
     try{
      const response = await axios.get (`${import.meta.env.VITE_BASE_URL}?q=${city}&lang=pt_br&units=metric&appid=${import.meta.env.VITE_KEY}`);
      setWeatherData (response.data);
      console.log (response.data); 
     } catch (error){
      console.error(error);
     }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleInputChange = (e) => {
      setCity(e.target.value);
    };

    const haandleSubmit = (e) => {
      e.preventDefault();
      fetchData();
    };

    return (
      <div className="home">
        <form className= "clima" onSubmit={haandleSubmit}>
          <input type="text"
          placeholder="nome da cidade"
          value={city}
          onChange={handleInputChange}/>
          <button type="submit">
            procurar
          </button>
        </form>
        {weatherData ? (
           <>
           <h2>{weatherData.name}</h2>
           <p>Temperatura: {weatherData.main.temp}°C</p>
           <p>Descrição: {weatherData.weather[0].description}</p>
           <p>Sensação termica : {weatherData.main.feels_like}°C</p>
           <p>Humidade do ar : {weatherData.main.humidity}%</p>
           <p>Pressão: {weatherData.main.pressure}</p>
           <p>velocidade dos ventos : {weatherData.wind.speed}m/s</p>
         </>
        ) : ( 
          <p></p>
        )}
      </div>
     );
    };
    
    export default Weather; 