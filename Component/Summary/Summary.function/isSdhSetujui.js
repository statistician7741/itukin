export default (organik, semua_kegiatan)=>{
    if(!organik.tl || !organik.psw) return false;
    let isAllKegFinalCommited = true;
    let all_spd_id = []
    if(semua_kegiatan[organik._id]){
        semua_kegiatan[organik._id].forEach(k=>{
            all_spd_id.push(k._id)
            if(!k.kinerja_approved) isAllKegFinalCommited = false;
        })
    }
    return {
        status: organik.tl.absensi_approved && organik.daily_cuti.d_c_approved && isAllKegFinalCommited,
        all_spd_id
    }
}