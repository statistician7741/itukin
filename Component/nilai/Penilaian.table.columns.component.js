import { Progress, Slider, Button } from 'antd';

export default (data, onAfterChange, onClickEditPenilaian, onClickKirimPenilaian) => [
    {
        title: 'Petugas',
        dataIndex: 'nama',
        key: 'name',
        render: (text, row) => <strong>{text}</strong>,
    },
    {
        title: 'Realisasi',
        dataIndex: 'target',
        key: 'target',
        render: (target, row) => <Progress percent={Math.ceil((row.progress ? (row.progress.length ? (row.progress.slice(-1)[0].jumlah) : 0) : 0) / target.jumlah * 100)}
            strokeColor={`hsl(${(((row.progress ? (row.progress.length ? (row.progress.slice(-1)[0].jumlah) : 0) : 0) / target.jumlah) * 120).toString(10)},100%,50%)`}
            size="small" />,
    },
    {
        title: 'Penilaian Kinerja',
        children: [
            {
                title: 'Realisasi',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.realisasi',
                render: (kinerja, currentRow) => <Slider
                    disabled={currentRow.kinerja_committed}
                    defaultValue={kinerja.realisasi || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange('realisasi', value, data, currentRow)} />,
            },
            {
                title: 'Ketepatan',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.ketepatan',
                render: (kinerja, currentRow) =>
                    <Slider
                        disabled={currentRow.kinerja_committed}
                        defaultValue={kinerja.ketepatan || 100}
                        min={80} max={100}
                        onAfterChange={(value) => onAfterChange('ketepatan', value, data, currentRow)} />,
            },
            {
                title: 'Kualitas',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.kualitas',
                render: (kinerja, currentRow) => <Slider
                    disabled={currentRow.kinerja_committed}
                    defaultValue={kinerja.kualitas || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange('kualitas', value, data, currentRow)} />,
            },
            {
                title: 'Kesungguhan',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.kesungguhan',
                render: (kinerja, currentRow) => <Slider
                    disabled={currentRow.kinerja_committed}
                    defaultValue={kinerja.kesungguhan || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange('kesungguhan', value, data, currentRow)} />,
            },
            {
                title: 'Administrasi',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.administrasi',
                render: (kinerja, currentRow) => <Slider
                    disabled={currentRow.kinerja_committed}
                    defaultValue={kinerja.administrasi || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange('administrasi', value, data, currentRow)} />,
            },
            {
                title: 'Pilihan',
                width: 64,
                dataIndex: 'kinerja_committed',
                key: 'kinerja_committed',
                render: (kinerja_committed, row) => (kinerja_committed ? <Button
                    size="small"
                    title="Ubah penilaian"
                    type="default"
                    onClick={() => onClickEditPenilaian(row.key)}>Edit</Button>
                    : <Button
                        size="small"
                        title="Kirim penilaian"
                        type="primary"
                        onClick={() => onClickKirimPenilaian(row.key, row.kinerja)}>Kirim</Button>)
            },
        ]
    }
];