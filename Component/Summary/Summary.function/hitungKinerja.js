function hitungSkor(kinerja) {
    const a = .3 * kinerja.realisasi + .25 * kinerja.ketepatan + .2 * kinerja.kualitas + .15 * kinerja.kesungguhan + .1 * kinerja.administrasi;
    return a
}
export default (organik, semua_kegiatan, index) => {
    try {
        if (semua_kegiatan[organik._id]) {
            if (index) {
                return (semua_kegiatan[organik._id].reduce(
                    (total, spd) => {
                        if(!spd.kinerja_committed) throw '-'
                        return (total + (spd.kinerja ? spd.kinerja[index] : (100).toFixed(2)))
                    }, 0
                ) / semua_kegiatan[organik._id].length).toFixed(2);
            } else {
                return (semua_kegiatan[organik._id].reduce(
                    (total, spd) => {
                        if(!spd.kinerja_committed) throw '-'
                        return (total + (spd.kinerja ? hitungSkor(spd.kinerja) : 100))
                    }, 0
                ) / semua_kegiatan[organik._id].length).toFixed(2);
            }
        } return (100).toFixed(2);
    } catch (error) {
        return error
    }
}

// AGREGAT
// export default (organik, semua_kegiatan)=>{
//     if(semua_kegiatan[organik._id]){
        // return (semua_kegiatan[organik._id].reduce(
        //     (total, spd)=>{
        //         return (total + (spd.kinerja?hitungSkor(spd.kinerja):100))
        //     }, 0
        // )/semua_kegiatan[organik._id].length).toFixed(2);
//     } else return 100;
// }