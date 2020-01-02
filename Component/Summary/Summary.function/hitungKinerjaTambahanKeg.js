function hitungSkor(kinerja) {
    const a = .3 * kinerja.realisasi + .25 * kinerja.ketepatan + .2 * kinerja.kualitas + .15 * kinerja.kesungguhan + .1 * kinerja.administrasi;
    return +a
}
export default (organik, index, tahun_anggaran, month, seksi) => {
    try {
        let kinerja_tamb_keg = 0;
        if (organik.tambahan_keg) {
            if (organik.tambahan_keg.length) {
                let count = 0;
                let sum = organik.tambahan_keg.reduce(
                    (total, keg) => {
                        if (keg._id.includes(`${tahun_anggaran}_${month}`)) {
                            // if (!keg.kinerja_committed) throw '-'
                            if (seksi) {
                                if (keg.seksi === seksi) {
                                    if (!keg.kinerja_committed) total + 0;
                                    count++;
                                    return (total + (keg.kinerja ? (index ? keg.kinerja[index] : hitungSkor(keg.kinerja)) : (100).toFixed(2)))
                                } else{
                                    return total + 0;
                                }
                            } else {
                                if (!keg.kinerja_committed) throw '-'
                                count++;
                                return (total + (keg.kinerja ? (index ? keg.kinerja[index] : hitungSkor(keg.kinerja)) : (100).toFixed(2)))
                            }
                        } else return total + 0;
                    }, 0
                )
                kinerja_tamb_keg = count ? (sum / count) : undefined;
            } else return undefined
        }
        return kinerja_tamb_keg?kinerja_tamb_keg:undefined
    } catch (error) {
        return error
    }
}