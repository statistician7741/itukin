const Organik = require('../../../models/organik.model');

module.exports = (query, cb, client) => {
    // const tahun_anggaran = client.handshake.cookies.tahun_anggaran
    Organik.findOneAndUpdate({
        '_id': query._id, "tl._id": query.tl._id
    }, {
        $set: {
            'tl.$': { ...query.tl, absensi_committed: true },
            'psw.$': { ...query.psw, absensi_committed: true },
            // 'ckp.$': { ...query.ckp, absensi_committed: true },
            'daily_cuti.$': { ...query.daily_cuti }
        }
    }, (e, r) => {
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal mengirim. Mohon hubungi admin." });
        } else cb({ type: 200, data: "Berhasil dikirim." });
    })

}