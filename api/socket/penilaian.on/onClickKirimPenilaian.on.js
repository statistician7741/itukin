const SPD = require('../../../models/spd.model');

module.exports = (query, cb, client) => {
    const tahun_anggaran = client.handshake.cookies.tahun_anggaran
    SPD.findOneAndUpdate({_id: query._id}, { kinerja_committed: true, kinerja: query.kinerja }, (e,r)=>{
        if (e) {
            console.log(e);
            cb({ type: 'error', data: "Gagal mengambil data SPD. Mohon hubungi admin." });
        } else cb({ type: 200, data: "Berhasil dikirim." });
    })
    
}