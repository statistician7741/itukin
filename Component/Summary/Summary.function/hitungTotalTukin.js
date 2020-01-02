import hitungKinerja from "./hitungKinerja";
import hitungTLPSW from "./hitungTLPSW";

export default (organik, semua_kegiatan, nilai_seksi, isRounded, tahun_anggaran, month) => {
    let persenKinerja = hitungKinerja(organik, semua_kegiatan, undefined, tahun_anggaran, month); //misal 80%
    if (persenKinerja === '-') {
        return '-'
    } else {
        if (organik.nmjab.match(/Kepala|Kasi|Koordinator Seksi|Koorsi/)) {
            const indexSeksi = organik.nmjab.match(/tata usaha|tu/i) ?
                'Tata Usaha' : (organik.nmjab.match(/sosial/i) ?
                    'Sosial' : (organik.nmjab.match(/produksi/i) ?
                        'Produksi' : (organik.nmjab.match(/distribusi/i) ?
                            'Distribusi' : (organik.nmjab.match(/nerwilis|neraca/i) ?
                                'Nerwilis' : 'IPDS'))));
            persenKinerja = (+persenKinerja + (nilai_seksi[indexSeksi]?nilai_seksi[indexSeksi]:100) ) / 2;
        }
    }
    const jumlahTLPSW = hitungTLPSW(organik.tl, organik.psw)
    let persenTLPSW = 100;
    if(jumlahTLPSW === '-') return '-'
        else persenTLPSW = hitungTLPSW(organik.tl, organik.psw) < 2 ? 100 : 99 //misal 99%
    const persenPengurangDaily = (organik.daily_cuti.daily * .05)
    const total = (persenTLPSW < +persenKinerja ? persenTLPSW : +persenKinerja) - persenPengurangDaily;
    if (total === 100) return total;
    return isRounded ?
        (Math.round(total) - total === 0.5? ( Math.round(total) % 2 == 0? Math.round(total): Math.floor(total) ) :Math.round(total))
        : total;
}