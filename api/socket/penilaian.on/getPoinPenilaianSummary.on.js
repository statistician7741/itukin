const moment = require('moment');
const SPD = require('../../../models/spd.model');

module.exports = (query, cb, client) => {
    const tahun_anggaran = client.handshake.cookies.tahun_anggaran
    const awal_bulan = moment().year(tahun_anggaran).month(query.month).startOf('month')
    const akhir_bulan = moment().year(tahun_anggaran).month(query.month).endOf('month')
    const queryDB = {
        "jenis_spd": "biasa", $and: [
            { "yang_bepergian.jab": { $not: /Kepala\sBPS|Kepala Badan Pusat|Mitra/ } }
        ], "yang_bepergian.nama": { $ne: "Organik" }, $or: [
            { $and: [{ 'waktu.berangkat': { $gte: awal_bulan } }, { 'waktu.berangkat': { $lte: akhir_bulan } }] },
            { $and: [{ 'waktu.kembali': { $gte: awal_bulan } }, { 'waktu.kembali': { $lte: akhir_bulan } }] },
            { $and: [{ 'waktu.berangkat': { $lte: awal_bulan } }, { 'waktu.kembali': { $gte: akhir_bulan } }] },
            { $and: [{ 'waktu.berangkat': { $gte: awal_bulan } }, { 'waktu.kembali': { $lte: akhir_bulan } }] }
        ]
    }
    SPD.find( queryDB, (e, r) => {
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal mengambil data SPD. Mohon hubungi admin." });
        } else {
            const semua_kegiatan = {};
            if (r.length) {
                r.forEach(spd => {
                    if (!semua_kegiatan[spd.yang_bepergian.nip]) {
                        semua_kegiatan[spd.yang_bepergian.nip] = [];
                    }
                    semua_kegiatan[spd.yang_bepergian.nip].push(spd)
                })
            }
            cb({ type: 200, data: { semua_kegiatan, length: r.length } });
        }
    })
}