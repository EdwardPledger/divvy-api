const chai = require('chai');
const chaiHttp = require('chai-http');

const 
const should = chai.should();

chai.use(chaiHttp);

describe('/GET/:id station', () => {
    it('it should get a station by id', done => {
        const stationMock = { "station_id":"2" }
    })
})