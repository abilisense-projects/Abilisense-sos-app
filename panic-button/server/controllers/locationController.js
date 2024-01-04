const {
    addLocationList,
    addLocation
} = require('../repositories/locationsRepo');

async function addLocationListBL() {
    return await addLocationList();
}
async function addLocationBL() {
    return await addLocation();
}

module.exports = {
    addLocationListBL,
    addLocationBL  
};