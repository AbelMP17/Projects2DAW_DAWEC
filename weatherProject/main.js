import { showWeather } from './components/showWeather.js';

import './style.css';

const dataContainer = document.getElementById('dataContainer');

const weatherBtn = document.querySelector('#weather');
const weatherInput = document.getElementById('city');

weatherInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    const city = document.getElementById('city').value;
    showWeather(city, dataContainer);
  }
})

weatherBtn.addEventListener('click', () => {
  const city = document.getElementById('city').value;
  showWeather(city, dataContainer);
});