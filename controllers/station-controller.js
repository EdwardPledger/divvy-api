const KoaRouter = require('koa-router');

const { getDataSource, getStationById } = require('../util/data-source-util');
const { getRiderInfo, getLastTwentyTrips } = require('../util/trip-data-util');

const router = KoaRouter();
let stationData;
const API_TOKEN = '123'

/**
 * Get station information by station_id
 */
router.get('/get-station/:id', async (ctx) => {
    const { id } = ctx.params;  // Error handling for invalid id
    const stationInfo = await getStationById(id);
    console.log('station info ', stationInfo);

    if (hasApiToken(ctx.headers['api-token'])) {
        if (stationInfo) {
            ctx.body = stationInfo;
        }
        else {
            ctx.body = { message: 'No station found by that ID' };
        }
    }
    else {
        ctx.body = { message: 'Missing API token in header' };
    }
});

/**
 * Get # of riders in [0-20, 21-30, 31-40, 41-50, 51+, unknown] age groups
 */
router.post('/get-riders/:day', async (ctx) => {
    const { stationIds } = ctx.request.body;
    const { day } = ctx.params;
    const totalRiderInfo = await getRiderInfo(stationIds, day);

    if (hasApiToken(ctx.headers['api-token'])) {
        if (totalRiderInfo) {
            ctx.body = totalRiderInfo;
        }
        else {
            ctx.body = { message: 'No rider info found for that date or station id(s)'};
        }
    }
    else {
        ctx.body = { message: 'Missing API token in header' };
    }
});

router.post('/get-trips/:day', async (ctx) => {
    const { stationIds } = ctx.request.body;
    const { day } = ctx.params;
    const tripInfo = await getLastTwentyTrips(stationIds, day);

    if (hasApiToken(ctx.headers['api-token'])) {
        if (tripInfo) {
            ctx.body = tripInfo;
        }
        else {
            ctx.body = { message: 'No trip info found for that dat or station id(s)'};
        }
    }
    else {
        ctx.body = { message: 'Missing API token in header' };
    }
});

const hasApiToken = (apiToken) => {
    if (apiToken === API_TOKEN) return true;
    else return false;
}

module.exports = router;