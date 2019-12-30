import hitungKinerja from "./Summary.function/hitungKinerja";
import hitungTLPSW from "./Summary.function/hitungTLPSW";
import hitungTotalTukin from "./Summary.function/hitungTotalTukin";

export default (semua_kegiatan, semua_organik) => [{
    title: 'Nama',
    dataIndex: 'nama',
    key: 'name',
    render: text => <strong>{text}</strong>,
},
{
    title: 'KINERJA (TK-K)',
    dataIndex: 'kinerja',
    key: 'kinerja',
    children: [{
        title: 'REALISASI',
        dataIndex: 'kinerja',
        key: 'kinerja.realisasi',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'realisasi')
    },{
        title: 'KETEPATAN',
        dataIndex: 'kinerja',
        key: 'kinerja.ketepatan',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'ketepatan')
    },{
        title: 'KUALITAS',
        dataIndex: 'kinerja',
        key: 'kinerja.kualitas',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'kualitas')
    },{
        title: 'KESUNGGUHAN',
        dataIndex: 'kinerja',
        key: 'kinerja.kesungguhan',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'kesungguhan')
    },{
        title: 'ADMINISTRASI',
        dataIndex: 'kinerja',
        key: 'kinerja.adm',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'administrasi')
    },{
        title: 'TOTAL',
        dataIndex: 'kinerja',
        key: 'kinerja',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan)
    }]
},
{
    title: 'ABSENSI',
    dataIndex: 'absensi',
    children: [{
        title: 'TL/PSW1-4',
        dataIndex: 'tl_psw',
        key: 'tl_psw',
        align: 'right',
        render: (tl_psw, { tl, psw }) => hitungTLPSW(tl, psw)
    }, {
        title: 'TK-A',
        dataIndex: 'tk_a',
        key: 'tk_a',
        align: 'right',
        render: (value, { tl, psw }) => hitungTLPSW(tl, psw) < 2 ? 100 : 99
    }]
},
{
    title: 'DAILY',
    dataIndex: 'daily',
    children: [{
        title: 'KOSONG',
        dataIndex: 'daily_cuti.daily',
        key: 'daily.kosong',
        align: 'right',
        render: (value, row) => value
    }, {
        title: 'POTONGAN TK',
        dataIndex: 'daily_cuti.daily',
        key: 'potongan_tk',
        align: 'right',
        render: (value, row) => (value*.05).toFixed(2)
    }, {
        title: 'TK-D',
        dataIndex: 'daily_cuti.daily',
        key: 'tk_d',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan)==='-'?'-':(hitungKinerja(row, semua_kegiatan) - value*.05).toFixed(2)
    }]
},
{
    title: 'CUTI',
    dataIndex: 'daily_cuti',
    children: [{
        title: 'CB',
        dataIndex: 'daily_cuti.cb',
        key: 'cb',
        align: 'right',
        render: (value, row) => value
    },{
        title: 'CP',
        dataIndex: 'daily_cuti.cp',
        key: 'cp',
        align: 'right',
        render: (value, row) => value
    },{
        title: 'CM',
        dataIndex: 'daily_cuti.cm',
        key: 'cm',
        align: 'right',
        render: (value, row) => value
    },{
        title: 'CS',
        dataIndex: 'daily_cuti.cs',
        key: 'cs',
        align: 'right',
        render: (value, row) => value
    },{
        title: 'CT',
        dataIndex: 'daily_cuti.ct',
        key: 'ct',
        align: 'right',
        render: (value, row) => value
    }]
},
{
    title: 'TOTAL TUNJANGAN KINERJA',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
    render: (value, row) => hitungTotalTukin(row, semua_kegiatan, semua_organik)
}]