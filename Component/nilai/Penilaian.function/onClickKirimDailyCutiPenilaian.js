export default (response, state, _id, props, cb) => {
    if (response.type === 200) {
        cb({
            semua_organik: [
                ...state.semua_organik.map(organik => {
                    return {
                        ...organik,
                        daily_cuti: _id !== organik._id ? organik.daily_cuti : { ...organik.daily_cuti, d_c_committed: true },
                    }
                })
            ]
        })
        props.showSuccessMessage("Berhasil dikirim.")
    } else {
        props.showErrorMessage("Terjadi error.")
    }
}