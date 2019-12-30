import { Col, Row, Typography, Select } from 'antd';
import dynamic from 'next/dynamic';
import moment from 'moment';
const TableSummary = dynamic(() => import('./Summary.table.component'))
import getPoinPenilaianSummary from "./Summary.function/getPoinPenilaianSummary";
import getSemuaOrganik from "../nilai/Penilaian.function/getSemuaOrganik";
import columns from "./Summary.tabel.columns.component";
import { Fragment } from 'react';

const { Option } = Select;

export default class Main extends React.Component {
    state = {
        semua_kegiatan: [],
        semua_organik: [],
        seksi: "Semua Seksi",
        month: moment().month()
    }

    getKegiatan = (month, seksi) => {
        this.props.socket.emit(
            'api.socket.penilaian/s/getPoinPenilaianSummary',
            { month, seksi },
            (response) => {
                getPoinPenilaianSummary(response, this.props, this.state.seksi, (result) => {
                    this.setState(result)
                })
            }
        )
    }

    getOrganik = (month) => {
        this.props.socket.emit(
            'api.socket.penilaian/s/getSemuaOrganik',
            { month, tahun: moment().format('YYYY') },
            (response) => {
                getSemuaOrganik(response, this.props, this.state.month, (result) => {
                    this.setState(result)
                })
            }
        )
    }

    componentDidMount = () => {
        setTimeout(() => {
            const { month, seksi } = this.state;
            this.getKegiatan(month, seksi);
            this.getOrganik(month);
        }, 100)
    }
    render() {
        const { semua_organik, semua_kegiatan, month, seksi } = this.state;
        return <Fragment>
            <Typography style={{ textAlign: "center" }}>
                <Typography.Title level={4}>REKAPITULASI TUNJANGAN KINERJA (KINERJA, ABSENSI, DAILY) BPS KABUPATEN KOLAKA</Typography.Title>
            </Typography>
            <Row style={{ marginBottom: 7 }} gutter={[3, 0]} type="flex" align="middle">
                <Col xs={3}>
                    <strong>Tunjangan Kinerja:</strong>
                </Col>
                <Col xs={4}>
                    <Select
                        placeholder="Pilih salah satu..."
                        value={month}
                        onChange={(v) => this.setState({ month: v }, () => {
                            const { month } = this.state;
                            this.getKegiatan(month, seksi);
                            this.getOrganik(month);
                        })}
                        style={{ width: "100%" }}
                    >
                        {[
                            'Januari', 'Februari', 'Maret', 'April',
                            'Mei', 'Juni', 'Juli', 'Agustus',
                            'September', 'Oktober', 'November', 'Desember'
                        ].map((m, i) => (<Option value={i} key={i}><strong>{m}</strong></Option>))}
                    </Select>
                </Col>
            </Row>
            <Row gutter={24} type="flex">
                <Col xs={24}>
                    <TableSummary columns={columns(semua_kegiatan, semua_organik)} data={semua_organik} />
                </Col>
            </Row>
        </Fragment>
    }
}