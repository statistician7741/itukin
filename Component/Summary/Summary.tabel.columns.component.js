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
    render: (value, row) => '100'
},
{
    title: 'ABSENSI',
    dataIndex: 'absensi',
    children: [{
        title: 'TL/PSW1-4',
        dataIndex: 'tl_psw',
        key: 'tl_psw',
        render: (value, row) => '0'
    }, {
        title: 'TK-A',
        dataIndex: 'tk_a',
        key: 'tk_a',
        render: (value, row) => '100'
    }]
},
{
    title: 'DAILY',
    dataIndex: 'daily',
    children: [{
        title: 'KOSONG',
        dataIndex: 'daily.kosong',
        key: 'daily.kosong',
        render: (value, row) => '0'
    }, {
        title: 'POTONGAN TK',
        dataIndex: 'potongan_tk',
        key: 'potongan_tk',
        render: (value, row) => '0.00'
    }, {
        title: 'TK-D',
        dataIndex: 'tk_d',
        key: 'tk_d',
        render: (value, row) => '100'
    }]
},
{
    title: 'CUTI',
    dataIndex: 'cuti',
    children: [{
        title: 'CB/CP/CM',
        dataIndex: 'cb_cp_cm',
        key: 'cb_cp_cm',
        render: (value, row) => '0'
    }]
},
{
    title: 'TOTAL TUNJANGAN KINERJA',
    dataIndex: 'total',
    key: 'total',
    render: (value, row) => '100'
}]