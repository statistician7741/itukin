const moment = require('moment');

const getPoinPenilaian = require('./penilaian.on/getPoinPenilaian');
const onClickKirimPenilaian = require('./penilaian.on/onClickKirimPenilaian');

function applyToClient(client) {
    client.on('api.socket.penilaian/s/getPoinPenilaian', getPoinPenilaian);
    client.on('api.socket.penilaian/s/onClickKirimPenilaian', onClickKirimPenilaian);
}

module.exports = applyToClient