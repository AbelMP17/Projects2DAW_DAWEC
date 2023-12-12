import autoAnimate from '@formkit/auto-animate';
import {getWeather } from '../assets/weather.js';
import { putImg } from './putImg.js';
import { putBackground } from './putBackground.js';

export async function showWeather(city, element){
  
    dataContainer.style.display = 'flex';
  
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=ff64bfcfe1fe50efabd910b84973628d`;

    const data = await getWeather(url);
  
    const name = document.createElement('h2');
    name.textContent = data.name;
    
    //--------------------------------------------------------

    const tempContainer = document.createElement('div');
    tempContainer.id = 'tempContainer';
    
    //--------------------------------------------------------
    const containerActTemp = document.createElement('div');
    containerActTemp.id = "containerActTemp";

    const titleActTemp = document.createElement('h1');
    titleActTemp.textContent = "Temperatura actual";
    
    const actTemp = document.createElement('h2');
    actTemp.textContent = data.main.temp + ' ºC';
    
    if(data.main.temp > 20){
      actTemp.style.background = 'rgb(180, 40, 40)';
    }else if(data.main.temp < 20){
      actTemp.style.background = 'rgb(40, 40, 180)';
    }

    containerActTemp.appendChild(titleActTemp);
    containerActTemp.appendChild(actTemp);
    //--------------------------------------------------------
    
    //--------------------------------------------------------
  
    const containerMaxTemp = document.createElement('div');
    containerMaxTemp.id = "containerMaxTemp";

    const titleMaxTemp = document.createElement('h1');
    titleMaxTemp.textContent = "Temperatura máxima";

    const tempMax = document.createElement('h2');
    tempMax.textContent = data.main.temp_max +' ºC';
    
    if(data.main.temp_max > 20){
      tempMax.style.background = 'rgb(180, 40, 40)';
    }else if(data.main.temp_max < 20){
      tempMax.style.background = 'rgb(40, 40, 180)';
    }

    containerMaxTemp.appendChild(titleMaxTemp);
    containerMaxTemp.appendChild(tempMax);

    //--------------------------------------------------------
    
    const containerMinTemp = document.createElement('div');
    containerMinTemp.id = "containerMinTemp";
    
    const titleMinTemp = document.createElement('h1');
    titleMinTemp.textContent = "Temperatura mínima";
    
    const tempMin = document.createElement('h2');
    tempMin.textContent = data.main.temp_min +' ºC';
    if(data.main.temp_min > 20){
      tempMin.style.background = 'rgb(180, 40, 40)';
    }else if(data.main.temp_min < 20){
      tempMin.style.background = 'rgb(40, 40, 180)';
    }

    containerMinTemp.appendChild(titleMinTemp);
    containerMinTemp.appendChild(tempMin);

    //--------------------------------------------------------


    tempContainer.appendChild(containerActTemp);
    tempContainer.appendChild(containerMaxTemp);
    tempContainer.appendChild(containerMinTemp);

    const imgWheather = putImg(data.weather.map(weath => weath.main));
  
    imgWheather.style.width = "64px";

    console.log(data);

    element.innerHTML = "";
  
    autoAnimate(element);

    element.appendChild(imgWheather);
    element.appendChild(name);
    element.appendChild(tempContainer);
  
    const backImg = putBackground(data.weather.map(weather => weather.main));

    document.body.style.backgroundImage = `url(${backImg.src})`;

    document.body.style.backgroundSize = "cover";

    document.body.style.backgroundRepeat = "no-repeat";



  }