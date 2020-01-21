/* Global Variables */

// Example: api.openweathermap.org/data/2.5/weather?zip=94040,us
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// API key 093a819cebc4fed3f2aaa4c46a25d8d5
const apiKey = ',us&APPID=093a819cebc4fed3f2aaa4c46a25d8d5';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// generate click listener
document.getElementById('generate').addEventListener('click', performAction);

// function when generate is clicked
async function performAction() {
  // get zip value
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  // GET date from openweathermap
  const weatherData = await getWeatherData(baseURL, zip, apiKey);
  if (weatherData.cod === "400") return;
  
  weatherData[feelings] = feelings;
  await postWeatherEntry("/add", weatherData);
  await getLatestEntry("/all");
}

const getWeatherData = async (baseURL, zip, key) => {
  const url = baseURL + zip + key;
  const res = await fetch(url);
  try {
    const weatherData = await res.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log("error", error);
    return "error";
    // appropriately handle the error
  }
}

const postWeatherEntry = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),     
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const getLatestEntry = async (url = '/all') => {
  const response = await fetch(url);

  try {
    const newData = await response.json();
    document.getElementById('date').textContent = newData.date;
    document.getElementById('temp').textContent = newData.temp;
    document.getElementById('content').textContent = newData.user_response;
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}