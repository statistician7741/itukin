const Organik = require('../../../models/organik.model');

module.exports = (query, cb, client) => {
    const tahun_anggaran = client.handshake.cookies.tahun_anggaran
    Organik.findOneAndUpdate({
        '_id': query._id, "daily_cuti._id": query.daily_cuti._id
    }, {
        $set: { 'daily_cuti.$': {...query.daily_cuti, d_c_committed: true} }
    }, (e, r) => {
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal mengirim. Mohon hubungi admin." });
        } else cb({ type: 200, data: "Berhasil dikirim." });
    })

}