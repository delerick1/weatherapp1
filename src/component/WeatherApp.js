
import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () =>{
    const [ allData, setAllData]= useState({})

    const [isferent, setIsFerent] = useState(true);
    useEffect(() => {

    function success(pos) {
        var crd = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less' ${crd.accuracy} + 'meters.`);
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=e51b86eb827a1f0ecc4d830a0145832f&units=metric`)
        .then((res) => {
        
        setAllData(res.data)
    

        }
        );  
    }
      
      function error(err) {
        console.warn("ERROR");
      }
      

      navigator.geolocation.getCurrentPosition(success, error);
    }, []);
   const chngUnit = () => setIsFerent(!isferent);
    
    console.log(allData);
    return (
        <>
      <div className='card'>
          
          <h1>Weather App </h1>
          
          <h2>{allData.name} {allData.sys?.country} </h2>

          <img src={`http://openweathermap.org/img/wn/${allData.weather?.[0].icon}@2x.png`} alt=""/>
          <h2>Temperature:{isferent ?  `${allData.main?.temp} C`:`${allData.main?.temp * 1.8 +32} F` } </h2>
          <button onClick={chngUnit}>
               DegreesF/C</button>
        
         
<h3>Wind Speed :{allData.wind?.speed } m/s</h3>
<h3>Clouds : {allData.clouds?.all} %</h3>
<h3>Pressure {allData.main?.pressure} mb</h3>



      </div>
      </>
        );
      }
      
      export default WeatherApp;
      