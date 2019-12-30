const Organik = require('../../../models/organik.model');
const moment = require('moment');
const async = require('async');

module.exports = ({ baru_nama_keg, baru_petugas, baru_bulan_penilaian, seksi }, cb) => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const getId = (bulan) => `${moment().format('YYYY')}_${bulan}_${baru_nama_keg}`;
    let task = [];
    baru_bulan_penilaian.forEach(month => {
        task.push((cb_t) => {
            Organik.updateMany({
                '_id': { $in: baru_petugas.map(o => o.key) }
            }, {
                $push: {
                    'tambahan_keg': {
                        _id: getId(month),
                        seksi,
                        nama_keg: baru_nama_keg
                    }
                }
            }, (e, r) => {
                cb_t(e, r);
            })
        })
    })
    async.auto(task, (e,f)=>{
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal menambah. Mohon hubungi admin." });
        } else cb({ type: 200, data: "Berhasil ditambahkan." });
    })

}