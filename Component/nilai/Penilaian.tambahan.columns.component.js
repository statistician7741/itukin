import { Progress, Slider, Button, Input } from 'antd';
import { Fragment } from 'react'

const { TextArea } = Input;

export default (data, onAfterChange, onClickEditPenilaian, onClickKirimPenilaian) => [
    {
        title: 'Petugas',
        dataIndex: 'nama',
        key: 'name',
        render: (text, row) => <strong>{text}</strong>,
    },
    {
        title: 'Penilaian Kinerja',
        children: [
            {
                title: 'Realisasi pekerjaan',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.realisasi',
                render: (kinerja, currentRow) => <Fragment>
                    <Slider
                        disabled={currentRow.kinerja_committed}
                        defaultValue={kinerja.realisasi || 100}
                        min={80} max={100}
                        onAfterChange={(value) => onAfterChange('realisasi', value, data, currentRow)} />
                    {kinerja.realisasi < 100 ? <TextArea
                        disabled={currentRow.kinerja_committed}
                        value={kinerja.realisasi_c}
                        onChange={({ target: { value } }) => onAfterChange('realisasi_c', value, data, currentRow)}
                        placeholder="alasan pengurangan"
                        allowClear>Hello world</TextArea> : null}
                </Fragment>,
            },
            {
                title: 'Ketepatan waktu',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.ketepatan',
                render: (kinerja, currentRow) => <Fragment>
                    <Slider
                        disabled={currentRow.kinerja_committed}
                        defaultValue={kinerja.ketepatan || 100}
                        min={80} max={100}
                        onAfterChange={(value) => onAfterChange('ketepatan', value, data, currentRow)} />
                    {kinerja.ketepatan < 100 ? <TextArea
                        disabled={currentRow.kinerja_committed}
                        value={kinerja.ketepatan_c}
                        onChange={({ target: { value } }) => onAfterChange('ketepatan_c', value, data, currentRow)}
                        placeholder="alasan pengurangan"
                        allowClear>Hello world</TextArea> : null}
                </Fragment>,
            },
            {
                title: 'Kualitas pekerjaan',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.kualitas',
                render: (kinerja, currentRow) => <Fragment> <Slider
                    disabled={currentRow.kinerja_committed}
                    defaultValue={kinerja.kualitas || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange('kualitas', value, data, currentRow)} />
                    {kinerja.kualitas < 100 ? <TextArea
                        disabled={currentRow.kinerja_committed}
                        value={kinerja.kualitas_c}
                        onChange={({ target: { value } }) => onAfterChange('kualitas_c', value, data, currentRow)}
                        placeholder="alasan pengurangan"
                        allowClear>Hello world</TextArea> : null}
                </Fragment>,
            },
            {
                title: 'Kesungguhan kerja',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.kesungguhan',
                render: (kinerja, currentRow) => <Fragment> <Slider
                    disabled={currentRow.kinerja_committed}
                    defaultValue={kinerja.kesungguhan || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange('kesungguhan', value, data, currentRow)} />
                    {kinerja.kesungguhan < 100 ? <TextArea
                        disabled={currentRow.kinerja_committed}
                        value={kinerja.kesungguhan_c}
                        onChange={({ target: { value } }) => onAfterChange('kesungguhan_c', value, data, currentRow)}
                        placeholder="alasan pengurangan"
                        allowClear>Hello world</TextArea> : null}
                </Fragment>,
            },
            {
                title: 'Administrasi',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.administrasi',
                render: (kinerja, currentRow) => <Fragment> <Slider
                    disabled={currentRow.kinerja_committed}
                    defaultValue={kinerja.administrasi || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange('administrasi', value, data, currentRow)} />
                    {kinerja.administrasi < 100 ? <TextArea
                        disabled={currentRow.kinerja_committed}
                        value={kinerja.administrasi_c}
                        onChange={({ target: { value } }) => onAfterChange('administrasi_c', value, data, currentRow)}
                        placeholder="alasan pengurangan"
                        allowClear>Hello world</TextArea> : null}
                </Fragment>,
            },
            {
                title: 'Pilihan',
                width: 64,
                dataIndex: 'kinerja_committed',
                key: 'kinerja_committed',
                render: (kinerja_committed, row) => (kinerja_committed ? <Button
                    disabled={row.kinerja_approved}
                    size="small"
                    title={row.kinerja_approved?"Sudah disetujui Kepala Kantor":"Ubah penilaian"}
                    type="default"
                    onClick={() => onClickEditPenilaian(row.nip, row._id)}>Edit</Button>
                    : <Button
                        disabled={
                            row.kinerja.realisasi < 100 && !row.kinerja.realisasi_c ||
                            row.kinerja.ketepatan < 100 && !row.kinerja.ketepatan_c ||
                            row.kinerja.kualitas < 100 && !row.kinerja.kualitas_c ||
                            row.kinerja.kesungguhan < 100 && !row.kinerja.kesungguhan_c ||
                            row.kinerja.administrasi < 100 && !row.kinerja.administrasi_c
                        }
                        size="small"
                        title="Kirim penilaian"
                        type="primary"
                        onClick={() => onClickKirimPenilaian(row.nip, row._id, row.kinerja)}>Kirim</Button>)
            },
        ]
    }
];