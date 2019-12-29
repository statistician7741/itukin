export default (response, state, key, props, cb) => {
    if (response.type === 200) {
        cb({
            semua_kegiatan: [
                ...state.semua_kegiatan.map(keg => {
                    return {
                        title: keg.title,
                        data: keg.data.map(k => {
                            if (k.key === key) {
                                return { ...k, kinerja_committed: true }
                            } else return k;
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