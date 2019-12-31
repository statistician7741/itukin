import moment from "moment";

export default (month, seksi, semua_organik)=>{
    let semua_tambahan_kegiatan_temp = {};
    semua_organik.forEach((organik, i)=>{
        if(organik.tambahan_keg){ //cek jika undefined
            if(organik.tambahan_keg.length){ //cek jika ada anggotanya
                organik.tambahan_keg.forEach(keg=>{
                    if(keg._id.includes(`${moment().format('YYYY')}_${month}`) && keg.seksi === seksi){
                        if(!semua_tambahan_kegiatan_temp[keg.nama_keg]){
                            semua_tambahan_kegiatan_temp[keg.nama_keg] = {};
                            semua_tambahan_kegiatan_temp[keg.nama_keg].data = [];
                        }
                        semua_tambahan_kegiatan_temp[keg.nama_keg].data.push({
                            key: organik._id+keg._id,
                            nama: organik.nama,
                            ...keg
                        })
                    }
                })
            }
        }
    })
    let semua_tambahan_kegiatan = [];
    for (let kegiatan in semua_tambahan_kegiatan_temp) {
        if (semua_tambahan_kegiatan_temp.hasOwnProperty(kegiatan)) {
            semua_tambahan_kegiatan.push({
                title: kegiatan,
                data: semua_tambahan_kegiatan_temp[kegiatan].data
            })
        }
    }
    return semua_tambahan_kegiatan;
}