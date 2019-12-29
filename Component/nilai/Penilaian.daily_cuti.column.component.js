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
}, {
    title: 'Cuti',
    dataIndex: 'cuti',
    children: [{
        title: 'CB/CP/CM',
        dataIndex: 'daily_cuti.cuti',
        key: 'daily_cuti.cuti',
        render: (value, row) => <InputNumber
            disabled={row.daily_cuti.d_c_committed}
            size="large"
            min={0}
            max={23}
            value={value}
            defaultValue={0}
            onChange={(value)=>onChangeDailyCuti('daily_cuti', 'cuti', value, row)} />,
    }]
},
{
    title: 'Pilihan',
    width: 64,
    dataIndex: 'daily_cuti',
    key: 'd_c_committed',
    render: (daily_cuti, row) => (row.daily_cuti.d_c_committed ? <Button
        size="small"
        title="Ubah penilaian"
        type="default"
        onClick={() => onClickEditPenilaian(row._id)}>Edit</Button>
        : <Button
            size="small"
            title="Kirim penilaian"
            type="primary"
            onClick={() => onClickKirimPenilaian(row._id, daily_cuti)}>Kirim</Button>)
}]