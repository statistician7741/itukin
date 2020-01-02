export default (semua_kegiatan, semua_organik, tahun_anggaran, month) => {
    const progress = {};
    ["Tata Usaha", "Sosial", "Produksi",
        "Distribusi", "Nerwilis", "IPDS"].forEach(seksi => {
            progress[seksi] = 0;
            let commited_count = 0;
            let total_poin_penilaian = 0;
            //spd
            for (let organik_nip in semua_kegiatan) {
                if (semua_kegiatan.hasOwnProperty(organik_nip)) {
                    semua_kegiatan[organik_nip].forEach(spd => {
                        if (spd.reserved.seksi === seksi) {
                            commited_count += spd.kinerja_committed ? 1 : 0;
                            total_poin_penilaian++;
                        }
                    })
                }
            }
            //keg tambahan
            semua_organik.forEach(organik => {
                if (organik.tambahan_keg) {
                    if (organik.tambahan_keg.length) {
                        organik.tambahan_keg.forEach(keg => {
                            if (keg._id.includes(`${tahun_anggaran}_${month}_${seksi}`)) {
                                commited_count += keg.kinerja_committed ? 1 : 0;
                                total_poin_penilaian++;
                            }
                        })
                    }
                }
                //khusus TU
                //tl, psw, daily, cuti
                if (seksi === 'Tata Usaha') {
                    if (organik.tl && organik.psw) {
                        commited_count += organik.tl.absensi_committed ? 1 : 0;
                        total_poin_penilaian++;
                    }
                    if (organik.daily_cuti) {
                        commited_count += organik.daily_cuti.d_c_committed ? 1 : 0;
                        total_poin_penilaian++;
                    }
                }
            })

            progress[seksi] = total_poin_penilaian ? Math.round(commited_count * 100 / total_poin_penilaian) : 100;
        })
        return progress;
}