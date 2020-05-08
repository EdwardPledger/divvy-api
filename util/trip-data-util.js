const fs = require('fs');
const path = require('path');

module.exports.readTripData = () => {
    const file = path.join(__dirname, '../', 'Divvy_Trips_2019_Q2');
    
    return fs.readFileSync(file, 'utf8').split('\n');
}

module.exports.createTripDataObject = () => {
    const tripData = this.readTripData();
    const formattedTripData = [];
    
    // This isn't working perfrectly (when data is missing/blank)
    tripData.forEach(trip => {
        const tripObject = Object.assign({}, trip.split(',')); // 7 is end station
        
        formattedTripData.push(tripObject);
    })
    
    return formattedTripData;
}

const getFormattedTripDataByDay = (formattedTripData, day) => {
    // Filter data by day (key = 2 (end day))
    const formattedTripDataByDay = formattedTripData.filter(formattedTrip => {
        if (formattedTrip['2']) {
            const tripDay = formattedTrip['2'].slice(5,10)
            return tripDay === day;
        }        
    })

    return formattedTripDataByDay;
}

const getTripsByStationIds = (formattedTripDataByDay, stationIds) => {
    const tripsByEndStationIds = [];

    // Filter trips by end station Id(s) (key = 7)
    stationIds.forEach(stationId => {
        const result = formattedTripDataByDay.filter(formattedTrip => {
            return formattedTrip['7'] === stationId.toString();
        })
        tripsByEndStationIds.push(result);
    })

    return tripsByEndStationIds;
}

module.exports.getRiderInfo = async (stationIds, day) => {
    // Different age groups
    const totalRiderInfo = [];
    const formattedTripData = this.createTripDataObject();
    let formattedTripDataByDay;
    let tripsByEndStationIds; // Holds an array of trips for each station id
    const test = formattedTripData.slice(5, 16);
    const currentYear = new Date().getFullYear();

    formattedTripDataByDay = getFormattedTripDataByDay(formattedTripData, day);
    tripsByEndStationIds = getTripsByStationIds(formattedTripDataByDay, stationIds);
    
    // Get ages of each trip
    tripsByEndStationIds.forEach(tripArray => {
        const riderInfo = {
            "0-20": 0,
            "21-30": 0,
            "31-40": 0,
            "41-50": 0,
            "50+": 0,
            "Unknown": 0
        }
        tripArray.forEach(trip => {
            const age = currentYear - parseInt(trip['11']);

            switch(true) {
                case (age <= 20):
                    riderInfo['0-20']++;
                    break;
                case (age > 20 && age <= 30):
                    riderInfo['21-30']++;
                    break;
                case (age > 30 && age <= 40):
                    riderInfo['31-40']++;
                    break;
                case (age > 40 && age <= 50):
                    riderInfo['41-50']++;
                    break;
                case (age > 50):
                    riderInfo['50+']++;
                    break;
                default:
                    riderInfo['Unknown']++;
                    break;
            }
        })
        totalRiderInfo.push(riderInfo);
    });
    console.log(totalRiderInfo);
    
    return totalRiderInfo;
}

module.exports.getLastTwentyTrips = (stationIds, day) => {
    const formattedTripData = this.createTripDataObject();
    const formattedTripDataByDay = getFormattedTripDataByDay(formattedTripData, day);
    const tripsByEndStationIds = getTripsByStationIds(formattedTripDataByDay, stationIds);
    const lastTwentyTrips = [];

    tripsByEndStationIds.forEach(tripArray => {
        let lastTwentyIndex;
        let tripArrayLength = tripArray.length;

        // Get last 20 unless there is less than or equal to 20 trips
        if (tripArrayLength > 20) {
            lastTwentyIndex = tripArrayLength - 21;
            lastTwentyTrips.push(tripArray.slice(lastTwentyIndex, tripArrayLength-1));
        }
        else {
            lastTwentyTrips.push(tripArray);
        }
    });
    
    return lastTwentyTrips;
}