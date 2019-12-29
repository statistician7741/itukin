export default (response, props, month, cb) => {
    if (response.type === 200) {
        if (response.data.length) {
            cb({ semua_organik: response.data.semua_organik })
        } else {
            cb({ semua_organik: [] })
        }
    } else {
        props.showErrorMessage("Terjadi error.")
    }
}