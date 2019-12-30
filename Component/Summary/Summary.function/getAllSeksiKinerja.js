import hitungKinerja from "./hitungKinerja";

export default (semua_kegiatan)=>{
    let nilai_seksi = {};
    for (let organik_nip in semua_kegiatan) {
        if (semua_kegiatan.hasOwnProperty(organik_nip)) {
            semua_kegiatan[organik_nip].forEach(spd=>{
                if(!nilai_seksi[spd.reserved.seksi]){
                    nilai_seksi[spd.reserved.seksi] = {length:0,sum:0}
                }
                const kinerja = hitungKinerja({_id: organik_nip}, semua_kegiatan);
                nilai_seksi[spd.reserved.seksi].sum += +kinerja;
                nilai_seksi[spd.reserved.seksi].length += 1;
            })
        }
    }
    for (let seksi in nilai_seksi) {
        if (nilai_seksi.hasOwnProperty(seksi)) {
            nilai_seksi[seksi] = nilai_seksi[seksi].sum/nilai_seksi[seksi].length;
        }
    }

    return nilai_seksi;
}