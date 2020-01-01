const SPD = require('../../../models/spd.model');
const Organik = require('../../../models/organik.model');
const async = require('async');

module.exports = ({ _id, all_spd_id, month, isApproved }, cb, client) => {
    const tahun_anggaran = client.handshake.cookies.tahun_anggaran;
    async.auto([(cb_1) => {
        SPD.updateMany({
            '_id': { $in: all_spd_id }
        }, {
            "kinerja_approved": isApproved
        }, (e, r) => {
            cb_1(e, r);
        })
    }, (cb_2) => {
        Organik.findOneAndUpdate({
            _id, "tl._id": `${tahun_anggaran}_${month}`, 
            "psw._id": `${tahun_anggaran}_${month}`,
            "daily_cuti._id": `${tahun_anggaran}_${month}`
        }, {
            $set: {
                'tl.$.absensi_approved': isApproved, 
                'psw.$.absensi_approved': isApproved,
                'daily_cuti.$.d_c_approved': isApproved
            }
        }, (e, r) => {
            cb_2(e,r);
        })
    }, (cb_3) => {
        Organik.findOneAndUpdate({
            _id, "tambahan_keg._id": { $regex: `${tahun_anggaran}_${month}`, $options: 'i'}
        }, {
            $set: {
                'tambahan_keg.$.kinerja_approved': isApproved,
            }
        }, (e, r) => {
            cb_3(e,r);
        })
    }], (e, f) => {
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal Mengirimkan persetujuan. Mohon hubungi admin." });
        } else cb({ type: 200, data: "Berhasil dikirim.", o: f });
    })

}