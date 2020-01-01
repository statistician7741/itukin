export default (response, semua_organik, nip, id_keg_tamb, kinerja, props, cb) => {
    if (response.type === 200) {
        cb({
            semua_organik: [
                ...semua_organik.map(organik => {
                    if(organik._id !== nip) return organik;
                    else return {
                        ...organik,
                        tambahan_keg: organik.tambahan_keg.map(keg=>{
                            if(keg._id !== id_keg_tamb) return keg;
                                else return {
                                    ...keg,
                                    kinerja,
                                    kinerja_committed: true
                                }
                        })
                    }
                })
            ]
        })
        props.showSuccessMessage("Berhasil dikirim.")
    } else {
        props.showErrorMessage("Terjadi error.")
    }
}