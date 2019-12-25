import { Col, Collapse, Row, Progress, Select } from 'antd'
import moment from 'moment';
import columns from './Penilaian.table.columns.component';
const { Option } = Select;

import dynamic from 'next/dynamic';
const TablePenilaian = dynamic(() => import("./Penilaian.table.component"));

const { Panel } = Collapse;

const genTitle = (title, progr, key, stateKey) => (
    <span>{key === stateKey ? <strong>{title}</strong> : title} <span style={{ float: "Right", width: 100 }}><Progress percent={progr} size="small" /></span></span>
);

export default class AddEditKec extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        activeKey: '1',
        month: moment().month(),
        semua_kegiatan: [],
        data: [
            {
                key: '1',
                nama: 'Sanur Saprah, SE',
                target: {
                    jumlah: 4,
                    satuan: 'Hotel',
                    realisasi: 2
                },
                kinerja: {
                    realisasi: 87,
                    ketepatan: 89,
                    kesungguhan: 87,
                    administrasi: 100,
                }
            },
            {
                key: '2',
                nama: 'Sapari',
                target: {
                    jumlah: 7,
                    satuan: 'Hotel',
                    realisasi: 1
                },
                kinerja: {
                    realisasi: 83,
                    ketepatan: 80,
                    kualitas: 88,
                    administrasi: 100,
                }
            },
            {
                key: '3',
                nama: 'Idhar Rahim',
                target: {
                    jumlah: 6,
                    satuan: 'Hotel',
                    realisasi: 5
                },
                kinerja: {
                    realisasi: 85,
                    kualitas: 80,
                    kesungguhan: 84,
                    administrasi: 92,
                }
            },
        ]
    }

    onAfterChange = (value, data, currentRow) => {
        const newData = [...data]
        newData.forEach((row, i) => {
            if (row.key === currentRow.key) {
                row.kinerja.realisasi = value;
            }
        })
        this.setState({ data: [...newData] });
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.props.socket.emit('api.socket.penilaian/s/getPoinPenilaian', "Hello server", (response) => {
                console.log(response);
                const semua_kegiatan = [];
                for (let keg in response) {
                    if (response.hasOwnProperty(keg)) {
                        semua_kegiatan.push({
                            title: keg,
                            data: response[keg].map(spd => ({
                                key: spd.nomor,
                                nama: spd.yang_bepergian.nama,
                                target: spd.target,
                                realisasi: spd.realisasi,
                                kinerja: spd.kinerja
                            }))
                        })
                    }
                }
                this.setState({ semua_kegiatan, activeKey: semua_kegiatan[0].title })
            })
        }, 100)
    }

    render() {
        const { activeKey, data, month, semua_kegiatan } = this.state;

        return (
            <React.Fragment>
                <Row style={{ marginBottom: 7 }} gutter={[3, 0]} type="flex" align="middle">
                    <Col xs={3}>
                        <strong>Tunjangan Kinerja:</strong>
                    </Col>
                    <Col xs={4}>
                        <Select
                            placeholder="Pilih salah satu..."
                            value={month}
                            onChange={(v) => this.setState({ month: v })}
                            style={{ width: "100%" }}
                        >
                            <Option value={0} key={0}><strong>Januari</strong></Option>
                            <Option value={1} key={1}><strong>Februari</strong></Option>
                            <Option value={2} key={2}><strong>Maret</strong></Option>
                            <Option value={3} key={3}><strong>April</strong></Option>
                            <Option value={4} key={4}><strong>Mei</strong></Option>
                            <Option value={5} key={5}><strong>Juni</strong></Option>
                            <Option value={6} key={6}><strong>Juli</strong></Option>
                            <Option value={7} key={7}><strong>Agustus</strong></Option>
                            <Option value={8} key={8}><strong>September</strong></Option>
                            <Option value={9} key={9}><strong>Oktober</strong></Option>
                            <Option value={10} key={10}><strong>November</strong></Option>
                            <Option value={11} key={11}><strong>Desember</strong></Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24}>
                        <Collapse
                            accordion
                            activeKey={activeKey}
                            onChange={(activeKey) => this.setState({ activeKey })}
                            expandIconPosition={"left"}
                        >
                            {semua_kegiatan.map(keg => <Panel header={genTitle(keg.title, 100, keg.title, activeKey)} key={keg.title}>
                                <TablePenilaian data={keg.data} columns={columns(data, this.onAfterChange)} />
                            </Panel>)}
                        </Collapse>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}