const superagent = require('superagent');

module.exports.getDataSource = async () => {
    let stationData;
    const url = 'https://gbfs.divvybikes.com/gbfs/en/station_information.json';

    await superagent
        .get(url)
        .then(res => {
            const { data } = res.body;
            const { stations } = data;
            stationData = stations;
        })
        .catch(err => {
            console.error('DATA SOURCE UTIL ERROR:\n', err);
        })

    return stationData;
}

module.exports.getStationById = async (id) => {
    let station;

    await this.getDataSource()
        .then(res => {
            const stationData = res;
            station = stationData.filter(station => {
                return station.station_id === id;
            })[0];
        })
        .catch(err => console.error(err)); // TODO: FIX THIS
        
        return station;
}