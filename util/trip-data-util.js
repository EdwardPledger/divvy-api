const fs = require('fs');
const path = require('path');

module.exports.readTripData = () => {
    const file = path.join(__dirname, '../', 'Divvy_Trips_2019_Q2');
    
    return fs.readFileSync(file, 'utf8').split('\n');
}

module.exports.createTripDataObject = () => {
    const tripData = this.readTripData();
    const formattedTripData = [];
    // let tripObject = {
    //     rentalId: 0,
    //     localStart: '',
    //     localEnd: '',
    //     bikeId: 0,
    //     duration: '',
    //     startStationId: 0,
    //     endStationId: 0,
    //     endStationName: '',
    //     userType: '',
    //     gender: '',
    //     birthYear: 0
    // }
    
    tripData.forEach(trip => {
        const tripObject = Object.assign({}, trip.split(',')); // 7 is end station
        
        formattedTripData.push(tripObject);
    })
    
    return formattedTripData;
}

module.exports.getRiderInfo = async (stationIds, day) => {
    // Different age groups
    const totalRiderInfo = [];
    const formattedTripData = this.createTripDataObject();
    let formattedTripDataByDay;
    const tripsByEndStationIds = []; // Holds an array of trips for each station id
    const test = formattedTripData.slice(5, 16);
    const currentYear = new Date().getFullYear();

    // Filter data by day (key = 2 (end day))
    formattedTripDataByDay = formattedTripData.filter(formattedTrip => {
        if (formattedTrip['2']) {
            const tripDay = formattedTrip['2'].slice(5,10)
            return tripDay === day;
        }        
    })

    // Filter trips by end station Id(s) (key = 7) //TODO: CHANGE BACK
    stationIds.forEach(stationId => {
        const result = formattedTripDataByDay.filter(formattedTrip => {
            return formattedTrip['7'] === stationId.toString();
        })
        tripsByEndStationIds.push(result);
    })
    // console.log(tripsByEndStationIds);
    
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