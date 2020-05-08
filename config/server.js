const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const stationController = require('../controllers/station-controller');

// Server configuration
class ServerConfiguration {

    constructor(portNumber) {
        const app = new Koa();
        const host = 'https://gbfs.divvybikes.com'

        app.use(bodyParser());
        app.use(stationController.routes());
        app.use(stationController.allowedMethods());
        app.listen(portNumber, () => console.log(`Listening on port ${portNumber}...`));
    }
}

module.exports = ServerConfiguration;