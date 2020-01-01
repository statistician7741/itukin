export default (response, state, nip, isApproved, props, cb) => {
    if (response.type === 200) {
        let semua_kegiatan_new = {}
        if(state.semua_kegiatan[nip]){
            semua_kegiatan_new = {...state.semua_kegiatan, [nip]: state.semua_kegiatan[nip].map(keg=>{
                return {...keg, 'kinerja_approved': isApproved}
            })}
        }
        cb({
            semua_kegiatan: state.semua_kegiatan[nip]?semua_kegiatan_new:{...state.semua_kegiatan},
            semua_organik: state.semua_organik.map(organik=>{
                if(organik._id !== nip) return organik
                    else return {
                        ...organik,
                        'tl': {...organik.tl, 'absensi_approved': isApproved},
                        'psw': {...organik.psw, 'absensi_approved': isApproved},
                        'daily_cuti': {...organik.daily_cuti, 'd_c_approved': isApproved},
                        'tambahan_keg': organik.tambahan_keg?(
                            organik.tambahan_keg.length?organik.tambahan_keg.map(keg_tamb=>{
                                if(keg_tamb._id){
                                    if(keg_tamb._id.includes(`${props.active_user.tahun_anggaran}_${state.month}`)){
                                        return {
                                            ...keg_tamb,
                                            'kinerja_approved': isApproved
                                        }
                                    } else return keg_tamb
                                } else{
                                    return keg_tamb;
                                }
                            }):[]
                        ):[]
                    }
            })
        })
    } else {
        props.showErrorMessage("Terjadi error.")
    }
}