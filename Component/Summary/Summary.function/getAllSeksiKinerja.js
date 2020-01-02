import hitungKinerja from "./hitungKinerja";
import hitungKinerjaTambahanKeg from "./hitungKinerjaTambahanKeg";

export default (semua_kegiatan, semua_organik, tahun_anggaran, month) => {
    //nilai
    const nilai_seksi = {}
    const seksis = ['Tata Usaha', 'Sosial', 'Produksi', 'Distribusi', 'Nerwilis', 'IPDS']
    seksis.forEach(seksi => {
        if (!nilai_seksi[seksi]) {
            nilai_seksi[seksi] = { length: 0, sum: 0 }
        }
        semua_organik.forEach(organik => {
            const kinerja = hitungKinerja(organik, semua_kegiatan, undefined, tahun_anggaran, month, seksi);
            if (kinerja !== undefined && kinerja !== '-') {
                nilai_seksi[seksi].sum += +kinerja;
                nilai_seksi[seksi].length++;
            }
        })
        nilai_seksi[seksi] = nilai_seksi[seksi].sum ? (nilai_seksi[seksi].sum / nilai_seksi[seksi].length) : 100;
    })

    return nilai_seksi;
}