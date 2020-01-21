// Setup empty JS object to act as endpoint for all routes
const projectData = {
  weatherEntry: []
};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies  - Middleware */
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

app.get("/all", function getProjectData(req, res) {
  res.send(projectData.weatherEntry);
});

app.post("/add", function addWeatherEntry(req,res) {
  const newData = req.body;
  console.log(newData);
  projectData.weatherEntry.push(newData);
  console.log(projectData);
  res.send({
    status: "success"
  });
});
