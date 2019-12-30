const Organik = require('../../../models/organik.model');

module.exports = (query, cb) => {
    Organik.findOneAndUpdate({
        '_id': query._id, "tl._id": query.tl._id
    }, {
        $set: { 'tl.$': {...query.tl, absensi_committed: true}, 'psw.$': {...query.psw, absensi_committed: true} }
    }, (e, r) => {
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal mengirim. Mohon hubungi admin." });
        } else cb({ type: 200, data: "Berhasil dikirim." });
    })

}