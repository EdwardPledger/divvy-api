const ServerConfiguration = require('./config/server');
const { getDataSource } = require('./util/data-source-util');

const portNumber = 3000;
let serverConfiguration;
let stationData;

// Get data
getDataSource('https://gbfs.divvybikes.com/gbfs/en/station_information.json')
.then(res => {
    stationData = res;
    // console.log('station data', res);
    module.exports.stationData = stationData;

    // Start the server once data is fetched
    serverConfiguration = new ServerConfiguration(portNumber);
});

