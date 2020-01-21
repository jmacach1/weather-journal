/* Global Variables */

// Example: api.openweathermap.org/data/2.5/weather?zip=94040,us
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// API key 093a819cebc4fed3f2aaa4c46a25d8d5
const apiKey = ',us&APPID=093a819cebc4fed3f2aaa4c46a25d8d5';

// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth() + 1;
let newDate = month + '.' + d.getDate() + '.' + d.getFullYear();

// generate click listener
document.getElementById('generate').addEventListener('click', performAction);

// function when generate is clicked
async function performAction() {
  // get zip value
  const zip = document.getElementById('zip').value;
  if (zip === "") {
    alert("Zip is empty. You must enter a zip is empty!");
    return;
  }
  const feelings = document.getElementById('feelings').value;
  if (feelings === "") {
    alert("Your feelings are empty. You gotta feel something!");
    return;
  };

  // GET date from openweathermap
  const weatherData = await getWeatherData(baseURL, zip, apiKey);
  if (weatherData === undefined) {
    console.log("Error - GET weatherData");
    return;
  }

  if (weatherData.cod === "400") {
    console.error("Invalid Request for weather data");
    return;
  }
  console.log(weatherData);
  const weatherEntry = {
    date: newDate,
    temperature: weatherData.main.temp,
    user_response: feelings,
  };
  const post_result = await postWeatherEntry("/add", weatherEntry);
  console.log(post_result);
  if (post_result.status === "success") {
    await getLatestEntry("/all");
  }
}

const getWeatherData = async (baseURL, zip, key) => {
  const url = baseURL + zip + key;
  try {
    const res = await fetch(url);
    const weatherData = await res.json();
    return weatherData;
  } catch (error) {
    // appropriately handle the error
    console.log(error);
  }
}

const postWeatherEntry = async (url = "/add", data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const getLatestEntry = async (url = '/all') => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const lastEntry = data[data.length - 1];

    outputDiv('date', lastEntry.date);
    outputDiv('temp', lastEntry.temperature);
    outputDiv('content', lastEntry.user_response);
  } catch (error) {
    console.log(error);
  }
}

function outputDiv(id, data) {
  const element = document.getElementById(id);
  element.innerHTML = `
    <span class="data_label">${id}</span> : <span class="data_value">${data}</span>
  `;
}
