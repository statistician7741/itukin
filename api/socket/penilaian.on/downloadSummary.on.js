const Organik = require('../../../models/organik.model');
const SPD = require('../../../models/spd.model');

module.exports = (query, cb, client) => {
    const tahun_anggaran = client.handshake.cookies.tahun_anggaran;
    cb({ type: 200, data: "Berhasil dihapus." });

}