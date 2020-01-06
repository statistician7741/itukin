import hitungKinerjaTambahanKeg from './hitungKinerjaTambahanKeg'

function hitungSkor(kinerja) {
    const a = .3 * kinerja.realisasi + .25 * kinerja.ketepatan + .2 * kinerja.kualitas + .15 * kinerja.kesungguhan + .1 * kinerja.administrasi;
    return +a
}
export default (organik, semua_kegiatan, index, tahun_anggaran, month, seksi) => {
    try {
        let kinerja_tamb_keg = hitungKinerjaTambahanKeg(organik, index, tahun_anggaran, month, seksi)
        
        if (semua_kegiatan[organik._id]) {
            let semua_kegiatan_new = seksi ?
                [...semua_kegiatan[organik._id].filter(spd => spd.reserved.seksi === seksi)]
                : semua_kegiatan[organik._id]

            if (!semua_kegiatan_new.length) {
                return (kinerja_tamb_keg && kinerja_tamb_keg!=='-'? kinerja_tamb_keg : 100).toFixed(2);
            }
            if (index) {
                if (kinerja_tamb_keg && kinerja_tamb_keg!=='-') {
                    return (((semua_kegiatan_new.reduce(
                        (total, spd) => {
                            if (!spd.kinerja_committed) throw '-'
                            return (total + (spd.kinerja ? spd.kinerja[index] : (100).toFixed(2)))
                        }, 0
                    ) / semua_kegiatan_new.length) + kinerja_tamb_keg) / 2).toFixed(2);
                } else {
                    return (semua_kegiatan_new.reduce(
                        (total, spd) => {
                            if (!spd.kinerja_committed) throw '-'
                            return (total + (spd.kinerja ? spd.kinerja[index] : (100).toFixed(2)))
                        }, 0
                    ) / semua_kegiatan_new.length).toFixed(2)
                }
            } else {
                if (kinerja_tamb_keg) {
                    return (((semua_kegiatan_new.reduce(
                        (total, spd) => {
                            if (!spd.kinerja_committed || kinerja_tamb_keg === '-') throw '-'
                            return (total + (spd.kinerja ? hitungSkor(spd.kinerja) : 100))
                        }, 0
                    ) / semua_kegiatan_new.length) + kinerja_tamb_keg) / 2).toFixed(2);
                } else {
                    return (semua_kegiatan_new.reduce(
                        (total, spd) => {
                            if (!spd.kinerja_committed) throw '-'
                            return (total + (spd.kinerja ? hitungSkor(spd.kinerja) : 100))
                        }, 0
                    ) / semua_kegiatan_new.length).toFixed(2);
                }
            }
        }

        if(kinerja_tamb_keg === undefined && !semua_kegiatan[organik._id]) return (100).toFixed(2)
        
        return kinerja_tamb_keg !== '-' && kinerja_tamb_keg? (kinerja_tamb_keg).toFixed(2):'-';
    } catch (error) {
        return error
    }
}