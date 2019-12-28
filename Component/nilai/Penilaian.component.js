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

export default class Penilaian extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        activeKey: '1',
        month: moment().month(),
        seksi: 'Distribusi',
        semua_kegiatan: [],
    }

    onAfterChange = (index, value, data, currentRow) => {
        const newData = [...data]
        newData.forEach((row, i) => {
            if (row.key === currentRow.key) {
                row.kinerja[index] = value;
            }
        })
        this.setState({ data: [...newData] });
    }

    getKegiatan = (month, seksi) => {
        this.props.socket.emit('api.socket.penilaian/s/getPoinPenilaian', { month, seksi }, (response) => {
            if (response.type === 200) {
                const semua_kegiatan = [];
                console.log(response);
                if (response.data.length) {
                    for (let keg in response.data.kegiatan) {
                        if (response.data.kegiatan.hasOwnProperty(keg)) {
                            semua_kegiatan.push({
                                title: keg,
                                data: response.data.kegiatan[keg].map(spd => ({
                                    key: spd._id,
                                    nama: spd.yang_bepergian.nama,
                                    target: spd.target,
                                    realisasi: spd.realisasi,
                                    kinerja: spd.kinerja,
                                    progress: spd.progress,
                                    kinerja_committed: spd.kinerja_committed
                                }))
                            })
                        }
                    }
                    this.setState({ semua_kegiatan, activeKey: semua_kegiatan[0].title })
                } else {
                    this.setState({ semua_kegiatan: [] })
                }
            } else {

            }
        })
    }

    onClickKirimPenilaian = (key, kinerja) => {
        this.props.socket.emit('api.socket.penilaian/s/onClickKirimPenilaian', { _id : key, kinerja }, (response) => {
            if(response.type === 200){
                this.setState({
                    semua_kegiatan: [
                        ...this.state.semua_kegiatan.map(keg => {
                            return {
                                title: keg.title,
                                data: keg.data.map(k => {
                                    if (k.key === key) {
                                        return { ...k, kinerja_committed: true }
                                    } else return k;
                                })
                            }
                        })
                    ]
                })
            } else{

            }
        })
    }

    onClickEditPenilaian = (key) => {
        this.setState({
            semua_kegiatan: [
                ...this.state.semua_kegiatan.map(keg => {
                    return {
                        title: keg.title,
                        data: keg.data.map(k => {
                            if (k.key === key) {
                                return { ...k, kinerja_committed: false }
                            } else return k;
                        })
                    }
                })
            ]
        })
    }

    componentDidMount = () => {
        setTimeout(() => {
            const { month, seksi } = this.state;
            this.getKegiatan(month, seksi);
        }, 100)
    }

    render() {
        const { activeKey, month, semua_kegiatan, seksi } = this.state;

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
                            onChange={(v) => this.setState({ month: v }, () => {
                                const { month, seksi } = this.state;
                                this.getKegiatan(month, seksi);
                            })}
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
                    <Col xs={1} style={{ marginLeft: 40 }}>
                        <strong>Seksi:</strong>
                    </Col>
                    <Col xs={4}>
                        <Select
                            placeholder="Pilih salah satu..."
                            value={seksi}
                            onChange={(v) => this.setState({ seksi: v }, () => {
                                const { month, seksi } = this.state;
                                this.getKegiatan(month, seksi);
                            })}
                            style={{ width: "100%" }}
                        >
                            <Option value={"Tata Usaha"} key={0}><strong>Tata Usaha</strong></Option>
                            <Option value={"Sosial"} key={1}><strong>Sosial</strong></Option>
                            <Option value={"Produksi"} key={2}><strong>Produksi</strong></Option>
                            <Option value={"Distribusi"} key={3}><strong>Distribusi</strong></Option>
                            <Option value={"Nerwilis"} key={4}><strong>Nerwilis</strong></Option>
                            <Option value={"IPDS"} key={5}><strong>IPDS</strong></Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24}>
                        <Collapse
                            accordion={true}
                            activeKey={activeKey}
                            onChange={(activeKey) => this.setState({ activeKey })}
                            expandIconPosition={"left"}
                        >
                            {semua_kegiatan.length ? semua_kegiatan.map(keg => <Panel header={genTitle(keg.title, Math.round((keg.data.reduce((a,b)=>(a+(b.kinerja_committed?1:0)),0))/keg.data.length*100), keg.title, activeKey)} key={keg.title}>
                                <TablePenilaian data={keg.data} columns={columns(keg.data, this.onAfterChange, this.onClickEditPenilaian, this.onClickKirimPenilaian)} />
                            </Panel>) : <Panel header="Tidak ada kegiatan"><strong>Tidak ada kegiatan Bulan ini.</strong></Panel>}
                        </Collapse>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}