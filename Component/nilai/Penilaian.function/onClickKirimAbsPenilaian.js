export default (response, state, _id, props, cb) => {
    if (response.type === 200) {
        cb({
            semua_organik: [
                ...state.semua_organik.map(organik => {
                    return {
                        ...organik,
                        tl: _id !== organik._id ? organik.tl : { ...organik.tl, absensi_committed: true },
                        psw: _id !== organik._id ? organik.psw : { ...organik.psw, absensi_committed: true },
                        // ckp: _id !== organik._id ? organik.ckp : { ...organik.ckp, absensi_committed: true }
                    }
                })
            ]
        })
        props.showSuccessMessage("Berhasil dikirim.")
    } else {
        props.showErrorMessage("Terjadi error.")
    }
}