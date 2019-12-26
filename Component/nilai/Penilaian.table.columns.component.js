import { Progress, Slider } from 'antd';

export default (data, onAfterChange)=>[
    {
        title: 'Petugas',
        dataIndex: 'nama',
        key: 'name',
        render: text => <strong>{text}</strong>,
    },
    {
        title: 'Realisasi',
        dataIndex: 'target',
        key: 'target',
        render: (target, row) => <Progress percent={Math.ceil(( row.progress? (row.progress.length?(row.progress.slice(-1)[0].jumlah):0):0 ) / target.jumlah * 100)}
            strokeColor={`hsl(${(( (row.progress? (row.progress.length?(row.progress.slice(-1)[0].jumlah):0):0) / target.jumlah) * 120).toString(10)},100%,50%)`}
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
                render: (kinerja, currentRow) => <Slider defaultValue={kinerja.realisasi || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange(value, data, currentRow)} />,
            },
            {
                title: 'Ketepatan',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.ketepatan',
                render: (kinerja, currentRow) =>
                    <Slider defaultValue={kinerja.ketepatan || 100}
                        min={80} max={100}
                        onAfterChange={(value) => onAfterChange(value, data, currentRow)} />,
            },
            {
                title: 'Kualitas',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.kualitas',
                render: (kinerja, currentRow) => <Slider defaultValue={kinerja.kualitas || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange(value, data, currentRow)} />,
            },
            {
                title: 'Kesungguhan',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.kesungguhan',
                render: (kinerja, currentRow) => <Slider
                    defaultValue={kinerja.kesungguhan || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange(value, data, currentRow)} />,
            },
            {
                title: 'Administrasi',
                width: 168,
                dataIndex: 'kinerja',
                key: 'kinerja.administrasi',
                render: (kinerja, currentRow) => <Slider
                    defaultValue={kinerja.administrasi || 100}
                    min={80} max={100}
                    onAfterChange={(value) => onAfterChange(value, data, currentRow)} />,
            },
        ]
    }
];