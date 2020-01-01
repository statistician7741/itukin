import { Button, InputNumber } from 'antd';

export default (onClickEditPenilaian, onClickKirimPenilaian, onChangeAbsensi) => [{
    title: 'Nama',
    dataIndex: 'nama',
    key: 'name',
    render: text => <strong>{text}</strong>,
}, {
    title: 'TL',
    dataIndex: 'tl',
    children: [{
        title: 'TL1',
        dataIndex: 'tl.tl1',
        key: 'tl.tl1',
        render: (value, row) => <InputNumber
            disabled={row.tl.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('tl', 'tl1', value, row)} />,
    }, {
        title: 'TL2',
        dataIndex: 'tl.tl2',
        key: 'tl.tl2',
        render: (value, row) => <InputNumber
            disabled={row.tl.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('tl', 'tl2', value, row)} />,
    }, {
        title: 'TL3',
        dataIndex: 'tl.tl3',
        key: 'tl.tl3',
        render: (value, row) => <InputNumber
            disabled={row.tl.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('tl', 'tl3', value, row)} />,
    }, {
        title: 'TL4',
        dataIndex: 'tl.tl4',
        key: 'tl.tl4',
        render: (value, row) => <InputNumber
            disabled={row.tl.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('tl', 'tl4', value, row)} />,
    }]
}, {
    title: 'PSW',
    dataIndex: 'psw',
    children: [{
        title: 'PSW1',
        dataIndex: 'psw.psw1',
        key: 'psw.psw1',
        render: (value, row) => <InputNumber
            disabled={row.psw.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('psw', 'psw1', value, row)} />,
    }, {
        title: 'PSW2',
        dataIndex: 'psw.psw2',
        key: 'psw.psw2',
        render: (value, row) => <InputNumber
            disabled={row.psw.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('psw', 'psw2', value, row)} />,
    }, {
        title: 'PSW3',
        dataIndex: 'psw.psw3',
        key: 'psw.psw3',
        render: (value, row) => <InputNumber
            disabled={row.psw.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('psw', 'psw3', value, row)} />,
    }, {
        title: 'PSW4',
        dataIndex: 'psw.psw4',
        key: 'psw.psw4',
        render: (value, row) => <InputNumber
            disabled={row.psw.absensi_committed}
            size="large"
            min={0}
            max={31}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeAbsensi('psw', 'psw4', value, row)} />,
    }]
},
{
    title: 'Pilihan',
    width: 64,
    dataIndex: 'absensi_committed',
    key: 'absensi_committed',
    render: (absensi_committed, row) => (row.tl.absensi_committed ? <Button
        disabled={row.tl.absensi_approved}
        size="small"
        title={row.tl.absensi_approved?"Sudah disetujui Kepala Kantor":"Ubah penilaian"}
        type="default"
        onClick={() => onClickEditPenilaian(row._id)}>Edit</Button>
        : <Button
            size="small"
            title="Kirim penilaian"
            type="primary"
            onClick={() => onClickKirimPenilaian(row._id, row.tl, row.psw)}>Kirim</Button>)
}]