const hitungKinerja = require('../../../Component/Summary/Summary.function/hitungKinerja')
const hitungTLPSW = require('../../../Component/Summary/Summary.function/hitungTLPSW')
const hitungTotalTukin = require('../../../Component/Summary/Summary.function/hitungTotalTukin')

const buatXlsx = require("../../../functions/xlsxGenerator.function").buatXlsx
const moment = require('moment')

module.exports = (query, cb, client) => {
    const tahun_anggaran = +client.handshake.cookies.tahun_anggaran;
    const { month, semua_kegiatan, semua_organik, nilai_seksi } = query;
    let data = []
    semua_organik.forEach(row => {
        data.push({
            nama: row.nama,

            kinerja_realisasi: hitungKinerja(row, semua_kegiatan, 'realisasi', tahun_anggaran, month),
            kinerja_ketepatan: hitungKinerja(row, semua_kegiatan, 'ketepatan', tahun_anggaran, month),
            kinerja_kualitas: hitungKinerja(row, semua_kegiatan, 'kualitas', tahun_anggaran, month),
            kinerja_kesungguhan: hitungKinerja(row, semua_kegiatan, 'kesungguhan', tahun_anggaran, month),
            kinerja_administrasi: hitungKinerja(row, semua_kegiatan, 'administrasi', tahun_anggaran, month),
            kinerja_total: hitungKinerja(row, semua_kegiatan, undefined, tahun_anggaran, month),

            absensi_tlpsw: hitungTLPSW(row.tl, row.psw),
            absensi_tka: hitungTLPSW(row.tl, row.psw) === '-' ? '-' : (hitungTLPSW(row.tl, row.psw) < 2 ? 100 : 99),

            daily_kosong: row.daily_cuti.daily,
            daily_potongan: (row.daily_cuti.daily * .05).toFixed(2),
            daily_tkd: hitungKinerja(row, semua_kegiatan) === '-' ? '-' : (hitungKinerja(row, semua_kegiatan) - row.daily_cuti.daily * .05).toFixed(2),

            cuti_cb: row.daily_cuti.cb,
            cuti_cp: row.daily_cuti.cp,
            cuti_cm: row.daily_cuti.cm,
            cuti_cs: row.daily_cuti.cs,
            cuti_ct: row.daily_cuti.ct,

            total_tk: hitungTotalTukin(row, semua_kegiatan, nilai_seksi, true, tahun_anggaran, month)
        });

        let file_path = `${moment().format('YYYY-MM-DD_HH-mm-ss')}_Tukin_BPS_Kab_Kolaka.xlsx`;
        buatXlsx(
            __dirname + "/../../../public/static/summary_template.xlsx",
            __dirname + `/../../../public/static/${file_path}`,
            (workbook) => {
                let sheet = workbook.sheet(0);
                let rowIndex = 3;
                data.forEach((row, i) => {
                    let r = sheet.range('A' + rowIndex + ':R' + rowIndex);
                    let arr = [
                        row.nama,

                        row.kinerja_realisasi,
                        row.kinerja_ketepatan,
                        row.kinerja_kualitas,
                        row.kinerja_kesungguhan,
                        row.kinerja_administrasi,
                        row.kinerja_total,

                        row.absensi_tlpsw,
                        row.absensi_tka,

                        row.daily_kosong,
                        row.daily_potongan,
                        row.daily_tkd,

                        row.cuti_cb,
                        row.cuti_cp,
                        row.cuti_cm,
                        row.cuti_cs,
                        row.cuti_ct,

                        row.total_tk
                    ]
                    r.value([
                        arr
                    ]);
                    rowIndex++
                })
            },
            () => {
                setTimeout(() => {
                    cb({ type: 200, data: `/static/${file_path}` })
                }, 2000)
            }
        )
    })
}