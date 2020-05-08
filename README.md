Thank you for the opportunity to try this coding challenge!

For some reason Github messes up this formatting of this document so if you hit the Raw button it will be formatted correctly.

To run locally:
1.) Clone or download project from Github.
2.) Open terminal (command line interface i.e. Command Prompt) at project directory
3.) Type the command "node app.js"
4.) You should see a message stating what port the server is running on
5.) Add Divvy_Trips_2019_Q2 file to the project directory (it was too big to upload to GitHub)
*) I included the node modules so you shouldn't have to download them

To test APIs:
*) Postman or some kind of API testing software is required (but one API can be tested on the browser)
1.) Open API testing software (I used Postman) or browser to test first API
2.) To test:
    1.) API to get station by ID: 
        1.) Choose GET request (if using API testing software)
        2.) URL: http://localhost:3000/get-station/:id (where id is the station id number i.e. 30)
        3.) Hit send button or enter in browser
    2.) API to get # of riders in age groups, by day, by station id(s)
        1.) Choose POST request (because request body is used for station ids)
        2.) URL: http://localhost:3000/get-riders/:day (where day is the specific day to filter on i.e. 04-01)
        3.) Create a request body like so: { "stationIds": [425, 23] }
        4.) Hit send button

Other Notes:
*) Didn't have enough time to attempt third api (get last 20 trips for a single day) because the second api took too much time, in retrospect I should have completed this one   first as it doesn't seem as complicated as the second api
*) I didn't get a chance to add API tokens but if I had more time I was going to implement JWT authentication
*) Also didn't have time to create tests for the API, but I would have used Jest
*) A lot of error handling is missing that I would have liked to had
