const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET/:id station', () => {
    it('it should get a station by id', done => {
        const stationMock = { "station_id":"2" }
        chai.request(server)
        .get('/get-station' + stationMock.station_id)
        .send(stationMock);
    });
});