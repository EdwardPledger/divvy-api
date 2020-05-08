const ServerConfiguration = require('./config/server');
const { getDataSource } = require('./util/data-source-util');

const portNumber = 3000;

// Start server
const serverConfiguration = new ServerConfiguration(portNumber);
