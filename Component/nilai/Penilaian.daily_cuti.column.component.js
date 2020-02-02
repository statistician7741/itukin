import { Button, InputNumber } from 'antd';

export default (onClickEditPenilaian, onClickKirimPenilaian, onChangeDailyCuti) => [{
    title: 'Nama',
    dataIndex: 'nama',
    key: 'name',
    render: text => <strong>{text}</strong>,
}, 
{
    title: 'Daily',
    dataIndex: 'daily_cuti',
    children: [{
        title: 'Kosong',
        dataIndex: 'daily_cuti.daily',
        key: 'daily_cuti.daily',
        render: (value, row) => <InputNumber
            disabled={row.daily_cuti.d_c_committed}
            size="large"
            style={{backgroundColor: value > 0?"blue":undefined, color: value > 0?"white":undefined}}
            min={0}
            max={23}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeDailyCuti('daily_cuti', 'daily', value, row)} />,
    }, {
        title: 'Potongan TK',
        dataIndex: 'daily_cuti.daily',
        key: 'daily_cuti.potongan',
        render: value => <span>{(value*0.05).toFixed(2)}</span>,
    },]
},
{
    title: 'Pilihan',
    width: 64,
    dataIndex: 'daily_cuti',
    key: 'd_c_committed',
    render: (daily_cuti, row) => (row.daily_cuti.d_c_committed ? <Button
        disabled={row.daily_cuti.d_c_approved}
        size="small"
        title={row.daily_cuti.d_c_approved?"Sudah disetujui Kepala Kantor":"Ubah penilaian"}
        type="default"
        onClick={() => onClickEditPenilaian(row._id)}>Edit</Button>
        : <Button
            size="small"
            title="Kirim penilaian"
            type="primary"
            onClick={() => onClickKirimPenilaian(row._id, daily_cuti)}>Kirim</Button>)
}]