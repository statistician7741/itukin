const Organik = require('../../../models/organik.model');

module.exports = ({ _ids, keg_nama, seksi, months }, cb, client) => {
    const tahun_anggaran = client.handshake.cookies.tahun_anggaran
    Organik.updateMany({
        _id: { $in: _ids }
    },
        { $pull: { tambahan_keg: { _id: { $in: months.map(m => (`${tahun_anggaran}_${m}_${seksi}_${keg_nama}`)) } } } }
        , (e, r) => {
            if (e) {
                console.log(e);
                cb({ type: 'error', data: "Gagal menghapus. Mohon hubungi admin." });
            } else cb({ type: 200, data: "Berhasil dihapus.", other: r });
        })

}