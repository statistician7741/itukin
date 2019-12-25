const moment = require('moment');

const getPoinPenilaian = require('./penilaian.on/getPoinPenilaian');

function applyToClient(client) {
    client.on('api.socket.penilaian/s/getPoinPenilaian', getPoinPenilaian);
}

module.exports = applyToClient