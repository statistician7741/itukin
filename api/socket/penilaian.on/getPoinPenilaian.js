const moment = require('moment');
const SPD = require('../../../models/spd.model');

module.exports = (query, cb) => {
    const awal_bulan = moment().month(query.month).startOf('month')
    const akhir_bulan = moment().month(query.month).endOf('month')
    SPD.find({
        "reserved.seksi": query.seksi, "jenis_spd": "biasa", $or: [
            { $and: [{ 'waktu.berangkat': { $gte: awal_bulan } }, { 'waktu.berangkat': { $lte: akhir_bulan } }] },
            { $and: [{ 'waktu.kembali': { $gte: awal_bulan } }, { 'waktu.kembali': { $lte: akhir_bulan } }] },
            { $and: [{ 'waktu.berangkat': { $lte: awal_bulan } }, { 'waktu.kembali': { $gte: akhir_bulan } }] },
            { $and: [{ 'waktu.berangkat': { $gte: awal_bulan } }, { 'waktu.kembali': { $lte: akhir_bulan } }] }
        ]
    }, (e, r) => {
        const kegiatan = {};
        if(r.length){
            r.forEach(spd=>{
                if(!kegiatan[spd.maksud]){
                    kegiatan[spd.maksud] = [];
                }
                kegiatan[spd.maksud].push(spd)
            })
        }
        cb({kegiatan, length: r.length});
    })
}