const getPoinPenilaian = require('./penilaian.on/getPoinPenilaian.on');
const getPoinPenilaianSummary = require('./penilaian.on/getPoinPenilaianSummary.on');
const getSemuaOrganik = require('./penilaian.on/getSemuaOrganik.on');
const onClickKirimPenilaian = require('./penilaian.on/onClickKirimPenilaian.on');
const onClickKirimAbsPenilaian = require('./penilaian.on/onClickKirimAbsPenilaian.on');
const onClickKirimDailyCutiPenilaian = require('./penilaian.on/onClickKirimDailyCutiPenilaian.on');
const onClickSimpanKegBaru = require('./penilaian.on/onClickSimpanKegBaru.on');

function applyToClient(client) {
    client.on('api.socket.penilaian/s/getSemuaOrganik', getSemuaOrganik);
    client.on('api.socket.penilaian/s/getPoinPenilaian', getPoinPenilaian);
    client.on('api.socket.penilaian/s/getPoinPenilaianSummary', getPoinPenilaianSummary);
    client.on('api.socket.penilaian/s/onClickKirimPenilaian', onClickKirimPenilaian);
    client.on('api.socket.penilaian/s/onClickKirimAbsPenilaian', onClickKirimAbsPenilaian);
    client.on('api.socket.penilaian/s/onClickKirimDailyCutiPenilaian', onClickKirimDailyCutiPenilaian);
    client.on('api.socket.penilaian/s/onClickSimpanKegBaru', onClickSimpanKegBaru);
}

module.exports = applyToClient