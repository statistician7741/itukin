export default (response, props, seksi, cb) => {
    if (response.type === 200) {
        if (response.data.length) {
            cb({ semua_kegiatan: response.data.semua_kegiatan })
        } else {
            cb({ semua_kegiatan: {} })
        }
    } else {
        props.showErrorMessage("Terjadi error.")
    }
}