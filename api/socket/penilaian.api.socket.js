const getPoinPenilaian = require('./penilaian.on/getPoinPenilaian');
const getPoinPenilaianSummary = require('./penilaian.on/getPoinPenilaianSummary');
const getSemuaOrganik = require('./penilaian.on/getSemuaOrganik');
const onClickKirimPenilaian = require('./penilaian.on/onClickKirimPenilaian');
const onClickKirimAbsPenilaian = require('./penilaian.on/onClickKirimAbsPenilaian');
const onClickKirimDailyCutiPenilaian = require('./penilaian.on/onClickKirimDailyCutiPenilaian');

function applyToClient(client) {
    client.on('api.socket.penilaian/s/getSemuaOrganik', getSemuaOrganik);
    client.on('api.socket.penilaian/s/getPoinPenilaian', getPoinPenilaian);
    client.on('api.socket.penilaian/s/getPoinPenilaianSummary', getPoinPenilaianSummary);
    client.on('api.socket.penilaian/s/onClickKirimPenilaian', onClickKirimPenilaian);
    client.on('api.socket.penilaian/s/onClickKirimAbsPenilaian', onClickKirimAbsPenilaian);
    client.on('api.socket.penilaian/s/onClickKirimDailyCutiPenilaian', onClickKirimDailyCutiPenilaian);
}

module.exports = applyToClient