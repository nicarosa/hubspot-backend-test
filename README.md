#Backend test

This is my solution to the Backend developer test from Hubspot.

The project is built in NodeJs express.

This are the steps you need to follow to run it:

1. Clone the repository.
2. Perform the command "npm i" to install all the required node modules.
3. Add the two required environment variables to the .env file, these are HUBSPOT_API_KEY (The api key provided in the test instructions) and the TABLE_NAME (The table name provided in the test instructions).
4. Perform the command "node app.js" to run the application.
5. You can test the server in two ways: First way is by using postman on the endpoints provided in the app.js file. Second way is opening the app.html file in a browser and using the user interface i've created.

The app.js contains 7 http methods and endpoints. These are:

- Getting the table information.
- Getting the rows from the published table.
- Getting the rows from the draft table.
- Adding a row to the draft table.
- Updating a row from the draft table.
- Publishing the draft table.
- Deleting a row from the draft table.

There are main files used:

- app.js: Handles the server running and endpoints with their http methods.
- app.html: Html file with the user interface.
- index.js: Script that handles all the js part of the html file.





