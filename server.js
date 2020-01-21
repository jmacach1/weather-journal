// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
import express, { static } from 'express';

// Start up an instance of app
const app = express();

/* Dependencies  - Middleware */
//Here we are configuring express to use body-parser as middle-ware.
import { urlencoded, json } from 'body-parser';
app.use(urlencoded({ extended: false }));
app.use(json());

// Cors for cross origin allowance
import cors from 'cors';
app.use(cors());

// Initialize the main project folder
app.use(static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

app.get("/all", function getProjectData(req, res) {
  res.send(projectData);
});

app.post('/add', function addWeatherEntry(req,res) {
  const newData = res.body;
  projectData[temperature] = newData.temperature;
  projectData[date] = newData.date;
  projectData[user_response] = newData.user_response;
  res.send("success");
});
