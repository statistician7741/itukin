const getPoinPenilaian = require('./penilaian.on/getPoinPenilaian.on');
const getPoinPenilaianSummary = require('./penilaian.on/getPoinPenilaianSummary.on');
const getSemuaOrganik = require('./penilaian.on/getSemuaOrganik.on');
const onClickKirimPenilaian = require('./penilaian.on/onClickKirimPenilaian.on');
const onClickKirimAbsPenilaian = require('./penilaian.on/onClickKirimAbsPenilaian.on');
const onClickKirimDailyCutiPenilaian = require('./penilaian.on/onClickKirimDailyCutiPenilaian.on');
const onClickSimpanKegBaru = require('./penilaian.on/onClickSimpanKegBaru.on');
const onClickKirimPenilaianTambahan = require('./penilaian.on/onClickKirimPenilaianTambahan.on');
const setApproved = require('./penilaian.on/setApproved.on');
const deleteKegTambahan = require('./penilaian.on/deleteKegTambahan.on');
const editKegTambahan = require('./penilaian.on/editKegTambahan.on');

function applyToClient(client) {
    client.on('api.socket.penilaian/s/getSemuaOrganik', (query,cb)=>getSemuaOrganik(query,cb,client));
    client.on('api.socket.penilaian/s/getPoinPenilaian', (query,cb)=>getPoinPenilaian(query,cb,client));
    client.on('api.socket.penilaian/s/getPoinPenilaianSummary', (query,cb)=>getPoinPenilaianSummary(query,cb,client));
    client.on('api.socket.penilaian/s/onClickKirimPenilaian', (query,cb)=>onClickKirimPenilaian(query,cb,client));
    client.on('api.socket.penilaian/s/onClickKirimAbsPenilaian', (query,cb)=>onClickKirimAbsPenilaian(query,cb,client));
    client.on('api.socket.penilaian/s/onClickKirimDailyCutiPenilaian', (query,cb)=>onClickKirimDailyCutiPenilaian(query,cb,client));
    client.on('api.socket.penilaian/s/onClickSimpanKegBaru', (query,cb)=>onClickSimpanKegBaru(query,cb,client));
    client.on('api.socket.penilaian/s/onClickKirimPenilaianTambahan', (query,cb)=>onClickKirimPenilaianTambahan(query,cb,client));
    client.on('api.socket.penilaian/s/setApproved', (query,cb)=>setApproved(query,cb,client));
    client.on('api.socket.penilaian/s/deleteKegTambahan', (query,cb)=>deleteKegTambahan(query,cb,client));
    client.on('api.socket.penilaian/s/editKegTambahan', (query,cb)=>editKegTambahan(query,cb,client));
}

module.exports = applyToClient