export default (seksi, semua_organik, tahun_anggaran) => {
    let semua_tambahan_kegiatan_inAYear = {};
    if (semua_organik.length) {
        semua_organik.forEach((organik, i) => {
            if (organik.tambahan_keg) { //cek jika undefined
                if (organik.tambahan_keg.length) { //cek jika ada anggotanya
                    //proses pemngambilan keg
                    organik.tambahan_keg.forEach(keg => {
                        //filter tahun
                        if (keg._id.includes(`${tahun_anggaran}_`) && keg.seksi === seksi) {
                            if (!semua_tambahan_kegiatan_inAYear[keg.nama_keg]) {
                                semua_tambahan_kegiatan_inAYear[keg.nama_keg] = {};
                                semua_tambahan_kegiatan_inAYear[keg.nama_keg].data = [];
                                semua_tambahan_kegiatan_inAYear[keg.nama_keg].bulan = [];
                            }
                            const bulan = keg._id.match(/(?<=\d{4}_)\d{1,2}/)
                            bulan&&semua_tambahan_kegiatan_inAYear[keg.nama_keg].bulan.push(bulan[0])
                            semua_tambahan_kegiatan_inAYear[keg.nama_keg].data.push({
                                nip: organik._id,
                                nama: organik.nama,
                                ...keg
                            })
                        }
                    })
                }
            }
        })
        return semua_tambahan_kegiatan_inAYear;
    } else return [];
}