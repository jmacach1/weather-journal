# Weather-Journal App Project

This project makes an asynchronous call to the OpenWeather API.

The user is prompted for information to make the request.

When user presses the GENERATE button. OpenWeather data is requested and the response is received and processed.

Along with information given by the user, a Weather Journal Entry is made and is sent in a 
POST request to the internal server which will be persisted.

A GET request is then called to retreive the journal entries and the latest is displayed by the UI.

