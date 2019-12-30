export default (response, props, seksi, cb) => {
    if (response.type === 200) {
        const semua_kegiatan = [];
        if (response.data.length) {
            for (let keg in response.data.kegiatan) {
                if (response.data.kegiatan.hasOwnProperty(keg)) {
                    semua_kegiatan.push({
                        title: keg,
                        data: response.data.kegiatan[keg].map(spd => ({
                            key: spd._id,
                            nama: spd.yang_bepergian.nama,
                            nip: spd.yang_bepergian.nip,
                            nomor: spd.nomor,
                            tgl_buat_spd: spd.tgl_buat_spd,
                            waktu: spd.waktu,
                            target: spd.target,
                            realisasi: spd.realisasi,
                            kinerja: spd.kinerja,
                            progress: spd.progress,
                            kinerja_committed: spd.kinerja_committed
                        }))
                    })
                }
            }
            cb({ semua_kegiatan })
        } else {
            cb({ semua_kegiatan: [] })
        }
    } else {
        props.showErrorMessage("Terjadi error.")
    }
}