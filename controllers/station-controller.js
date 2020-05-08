const KoaRouter = require('koa-router');

const { getDataSource, getStationById } = require('../util/data-source-util');
const { getRiderInfo, getLastTwentyTrips } = require('../util/trip-data-util');

const router = KoaRouter();
let stationData;

router.get('/', async (ctx) => {

    // NEED TO MAKE SURE LOADED BEFORE API'S CAN BE HIT; CREATE A TEMP JSON FILE TO READ FROM IN APP.JS; COULD ALSO LOAD DATA IN ONLY THE APIS THAT REQUIRE IT 
    // Data loaded once home screen is hit
    getDataSource('https://gbfs.divvybikes.com/gbfs/en/station_information.json')
    .then(res => {
        stationData = res;
        console.log('station data', stationData);
    });
})

/**
 * Get station information by station_id
 */
router.get('/get-station/:id', async (ctx) => {
    const { id } = ctx.params;  // Error handling for invalid id
    console.log('id', id);
    const stationInfo = await getStationById(id);
    console.log('station info ', stationInfo);
    if (stationInfo) {
        ctx.body = stationInfo;
    }
    else {
        ctx.body = { message: 'No station found by that ID' };
    }
});

/**
 * Get # of riders in [0-20, 21-30, 31-40, 41-50, 51+, unknown] age groups
 */
router.post('/get-riders/:day', async (ctx) => {
    const { stationIds } = ctx.request.body;
    const { day } = ctx.params;
    const totalRiderInfo = await getRiderInfo(stationIds, day);

    if (totalRiderInfo) {
        ctx.body = totalRiderInfo;
    }
    else {
        ctx.body = { message: 'No rider info found for that date or station id(s)'};
    }
});

router.post('/get-trips/:day', async (ctx) => {
    const { stationIds } = ctx.request.body;
    const { day } = ctx.params;
    const tripInfo = await getLastTwentyTrips(stationIds, day);

    if (tripInfo) {
        ctx.body = tripInfo;
    }
    else {
        ctx.body = { message: 'No trip info found for that dat or station id(s)'};
    }
});


module.exports = router;