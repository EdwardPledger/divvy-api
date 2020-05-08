Thank you for the opportunity to try this coding challenge!

For some reason Github messes up the formatting of this document so if you hit the Raw or edit button it will be formatted correctly.

To run locally:
1.) Clone or download project from Github.
2.) Open terminal (command line interface i.e. Command Prompt) at project directory
3.) Type the command "node app.js"
4.) You should see a message stating what port the server is running on
5.) Add Divvy_Trips_2019_Q2 file to the project directory (it was too big to upload to GitHub)
*) I included the node modules so you shouldn't have to download them

To test APIs:
*) Postman or some kind of API testing software is required due to security (api token) and request body in last two apis.
1.) Open API testing software (I used Postman)
2.) To test:
    1.) API to get station by ID: 
        1.) Choose GET request
        2.) URL: http://localhost:3000/get-station/:id (where id is the station id number i.e. 30)
        3.) Add header -> api-token: 123
        4.) Hit send button or enter in browser
    2.) API to get # of riders in age groups, by day, by station id(s)
        1.) Choose POST request (because request body is used for station ids)
        2.) URL: http://localhost:3000/get-riders/:day (where day is the specific day to filter on i.e. 04-01)
        3.) Create a request body like so: { "stationIds": [425, 23] }
        4.) Add header -> api-token: 123
        5.) Hit send button
    3.) API to get last twenty trips for a single day, by station id(s)
        1.) Choose POST request (because request body is used for station ids)
        2.) URL: http://localhost:3000/get-trips/:day (where day is the specific day to filter on i.e. 04-01)
        3.) Create a request body like so: { "stationIds": [425, 23] }
        4.) Add header -> api-token: 123
        5.) Hit send button
        
Other Notes:
*) My implementation of api tokens is very crude (due to time constraint), I would have used JWT authentication with more time
*) Didn't have time to finish testing, it's only partially implemented
*) A lot of error handling is missing that I would have liked to have
