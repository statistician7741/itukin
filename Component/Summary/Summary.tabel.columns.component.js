import { Button, Tag } from 'antd'
import hitungKinerja from "./Summary.function/hitungKinerja";
import hitungTLPSW from "./Summary.function/hitungTLPSW";
import hitungTotalTukin from "./Summary.function/hitungTotalTukin";
import isSdhSetujui from "./Summary.function/isSdhSetujui";

export default (semua_kegiatan, semua_organik, nilai_seksi, tahun_anggaran, month, onClickApproved, isKepalaKantor) => [{
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
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'realisasi', tahun_anggaran, month)
    }, {
        title: 'KETEPATAN',
        dataIndex: 'kinerja',
        key: 'kinerja.ketepatan',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'ketepatan', tahun_anggaran, month)
    }, {
        title: 'KUALITAS',
        dataIndex: 'kinerja',
        key: 'kinerja.kualitas',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'kualitas', tahun_anggaran, month)
    }, {
        title: 'KESUNGGUHAN',
        dataIndex: 'kinerja',
        key: 'kinerja.kesungguhan',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'kesungguhan', tahun_anggaran, month)
    }, {
        title: 'ADMINISTRASI',
        dataIndex: 'kinerja',
        key: 'kinerja.adm',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan, 'administrasi', tahun_anggaran, month)
    }, {
        title: 'TOTAL',
        dataIndex: 'kinerja',
        key: 'kinerja',
        align: 'right',
        render: (value, row) => <strong>{hitungKinerja(row, semua_kegiatan, undefined, tahun_anggaran, month)}</strong>
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
        render: (value, { tl, psw }) => <strong>{hitungTLPSW(tl, psw) === '-' ? '-' : (hitungTLPSW(tl, psw) < 2 ? 100 : 99)}</strong>
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
        render: (value, row) => <strong>{(value * .05).toFixed(2)}</strong>
    }, {
        title: 'TK-D',
        dataIndex: 'daily_cuti.daily',
        key: 'tk_d',
        align: 'right',
        render: (value, row) => hitungKinerja(row, semua_kegiatan) === '-' ? '-' : (hitungKinerja(row, semua_kegiatan) - value * .05).toFixed(2)
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
    }, {
        title: 'CP',
        dataIndex: 'daily_cuti.cp',
        key: 'cp',
        align: 'right',
        render: (value, row) => value
    }, {
        title: 'CM',
        dataIndex: 'daily_cuti.cm',
        key: 'cm',
        align: 'right',
        render: (value, row) => value
    }, {
        title: 'CS',
        dataIndex: 'daily_cuti.cs',
        key: 'cs',
        align: 'right',
        render: (value, row) => value
    }, {
        title: 'CT',
        dataIndex: 'daily_cuti.ct',
        key: 'ct',
        align: 'right',
        render: (value, row) => value
    }]
},
{
    title: 'TOTAL TK',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
    render: (value, row) => <strong>{hitungTotalTukin(row, semua_kegiatan, nilai_seksi, true, tahun_anggaran, month)}</strong>
},
{
    title: 'Persetujuan',
    dataIndex: 'kinerja_committed',
    key: 'kinerja_committed',
    align: 'center',
    fixed: 'right',
    width: 100,
    render: (kinerja_committed, row) => isKepalaKantor?(isSdhSetujui(row, semua_kegiatan).status ? <Button
        size="small"
        title="Klik untuk membatalkan persetujuan agar bisa diubah"
        type="primary"
        onClick={() => onClickApproved(row._id, isSdhSetujui(row, semua_kegiatan).all_spd_id, false)}>Disetujui</Button>
        : (hitungTotalTukin(row, semua_kegiatan, nilai_seksi, true, tahun_anggaran, month)!=='-'?<Button
            size="small"
            title="Klik untuk finalkan Besaran Tunjangan Kinerja"
            type="default"
            style={{ background: "red", borderColor: "red", color: "white" }}
            onClick={() => onClickApproved(row._id, isSdhSetujui(row, semua_kegiatan).all_spd_id, true)}>Setujui</Button>:'-')):(
                !isSdhSetujui(row, semua_kegiatan).status?<Tag color="#f50">Belum disetujui</Tag>:
                <Tag color="#87d068">Disetujui</Tag>
            )
}]