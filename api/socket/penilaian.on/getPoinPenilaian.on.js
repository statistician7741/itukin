const moment = require('moment');
const SPD = require('../../../models/spd.model');
const Kec = require('../../../models/kec.model');

module.exports = (query, cb) => {
    const awal_bulan = moment().month(query.month).startOf('month')
    const akhir_bulan = moment().month(query.month).endOf('month')
    const queryDB = {
        "jenis_spd": "biasa", $and: [
            { "yang_bepergian.jab": { $not: /Kepala\sBPS|Kepala Badan Pusat/ } }
        ], "yang_bepergian.nama": { $ne: "Organik" }, $or: [
            { $and: [{ 'waktu.berangkat': { $gte: awal_bulan } }, { 'waktu.berangkat': { $lte: akhir_bulan } }] },
            { $and: [{ 'waktu.kembali': { $gte: awal_bulan } }, { 'waktu.kembali': { $lte: akhir_bulan } }] },
            { $and: [{ 'waktu.berangkat': { $lte: awal_bulan } }, { 'waktu.kembali': { $gte: akhir_bulan } }] },
            { $and: [{ 'waktu.berangkat': { $gte: awal_bulan } }, { 'waktu.kembali': { $lte: akhir_bulan } }] }
        ]
    }
    if(query.seksi !== "Semua Seksi") queryDB["reserved.seksi"] = query.seksi;
    SPD.find( queryDB ).populate('tujuan1.lokasi tujuan2.lokasi tujuan3.lokasi').exec((e, r) => {
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal mengambil data SPD. Mohon hubungi admin." });
        } else {
            const kegiatan = {};
            if (r.length) {
                r.forEach(spd => {
                    if (!kegiatan[spd.maksud]) {
                        kegiatan[spd.maksud] = [];
                    }
                    kegiatan[spd.maksud].push(spd)
                })
            }
            cb({ type: 200, data: { kegiatan, length: r.length } });
        }
    })
}