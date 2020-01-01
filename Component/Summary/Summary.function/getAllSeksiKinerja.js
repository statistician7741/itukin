import hitungKinerja from "./hitungKinerja";
import hitungKinerjaTambahanKeg from "./hitungKinerjaTambahanKeg";

export default (semua_kegiatan, semua_organik, tahun_anggaran, month) => {
    let nilai_seksi = {};
    for (let organik_nip in semua_kegiatan) {
        if (semua_kegiatan.hasOwnProperty(organik_nip)) {
            semua_kegiatan[organik_nip].forEach(spd => {
                if (!nilai_seksi[spd.reserved.seksi]) {
                    nilai_seksi[spd.reserved.seksi] = { length: 0, sum: 0 }
                }
                const kinerja = hitungKinerja({ _id: organik_nip }, semua_kegiatan);
                nilai_seksi[spd.reserved.seksi].sum += +kinerja;
                nilai_seksi[spd.reserved.seksi].length += 1;
            })
        }
    }
    const nilai_seksi_tamb = {}
    const seksis = ['Tata Usaha', 'Sosial', 'Produksi','Distribusi', 'Nerwilis', 'IPDS']
    seksis.forEach(seksi => {
        semua_organik.forEach(organik => {
            if (!nilai_seksi_tamb[seksi]) {
                nilai_seksi_tamb[seksi] = { length: 0, sum: 0 }
            }
            const org_nilai = hitungKinerjaTambahanKeg(organik, undefined, tahun_anggaran, month, seksi);
            if (org_nilai !== undefined) {
                nilai_seksi_tamb[seksi].sum += org_nilai;
                nilai_seksi_tamb[seksi].length++;
            }
        })
    })

    seksis.forEach(seksi => {
        if(nilai_seksi[seksi]){
            nilai_seksi[seksi] = (nilai_seksi[seksi].sum+ (nilai_seksi_tamb[seksi].sum?nilai_seksi_tamb[seksi].sum:0) ) / (nilai_seksi[seksi].length + (nilai_seksi_tamb[seksi].length?nilai_seksi_tamb[seksi].length:0) );
        } else{
            nilai_seksi[seksi] = nilai_seksi_tamb[seksi]?(nilai_seksi_tamb[seksi].sum / nilai_seksi_tamb[seksi].length):100;
        }
    })
    return nilai_seksi;
}