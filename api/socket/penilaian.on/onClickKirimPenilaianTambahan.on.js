const Organik = require('../../../models/organik.model');

module.exports = ({ _id, id_keg_tamb, kinerja }, cb, client) => {
    Organik.findOneAndUpdate({
        _id, "tambahan_keg._id": id_keg_tamb
    }, {
        $set: { 'tambahan_keg.$.kinerja': kinerja, 'tambahan_keg.$.kinerja_committed': true }
    }, (e, r) => {
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal mengirim. Mohon hubungi admin." });
        } else cb({ type: 200, data: "Berhasil dikirim." });
    })

}