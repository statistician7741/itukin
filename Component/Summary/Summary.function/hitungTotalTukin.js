import hitungKinerja from "./hitungKinerja";
import hitungTLPSW from "./hitungTLPSW";

export default (row, semua_kegiatan, nilai_seksi, isRounded, tahun_anggaran, month) => {
    let persenKinerja = hitungKinerja(row, semua_kegiatan, undefined, tahun_anggaran, month); //misal 80%
    if (persenKinerja === '-') {
        return persenKinerja
    } else {
        if (row.nmjab.match(/Kepala|Kasi|Koordinator Seksi|Koorsi/)) {
            const indexSeksi = row.nmjab.match(/tata usaha|tu/i) ?
                'Tata Usaha' : (row.nmjab.match(/sosial/i) ?
                    'Sosial' : (row.nmjab.match(/produksi/i) ?
                        'Produksi' : (row.nmjab.match(/distribusi/i) ?
                            'Distribusi' : (row.nmjab.match(/nerwilis|neraca/i) ?
                                'Nerwilis' : 'IPDS'))));
            persenKinerja = (+persenKinerja + (nilai_seksi[indexSeksi]?nilai_seksi[indexSeksi]:100) ) / 2;
        }
    }
    const jumlahTLPSW = hitungTLPSW(row.tl, row.psw)
    let persenTLPSW = 100;
    if(jumlahTLPSW === '-') return '-'
        else persenTLPSW = hitungTLPSW(row.tl, row.psw) < 2 ? 100 : 99 //misal 99%
    const persenPengurangDaily = (row.daily_cuti.daily * .05)
    const total = (persenTLPSW < +persenKinerja ? persenTLPSW : +persenKinerja) - persenPengurangDaily;
    if (total === 100) return total;
    return isRounded ?
        (Math.round(total) - total === 0.5? ( Math.round(total) % 2 == 0? Math.round(total): Math.floor(total) ) :Math.round(total))
        : total;
}