import { Col, Row, Typography, Select, Card, Button, Progress, Tooltip, Divider } from 'antd';
import dynamic from 'next/dynamic';
import moment from 'moment';
const TableSummary = dynamic(() => import('./Summary.table.component'))
import getPoinPenilaianSummary from "./Summary.function/getPoinPenilaianSummary";
import getAllSeksiKinerja from "./Summary.function/getAllSeksiKinerja";
import getSemuaOrganik from "../nilai/Penilaian.function/getSemuaOrganik";
import onClickApprovedResponseHandle from "./Summary.function/onClickApprovedResponseHandle";
import columns from "./Summary.tabel.columns.component";
import { Fragment } from 'react';
import getProgressEntri from './Summary.function/getProgressEntri';

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
                    this.setState({ semua_kegiatan: result.semua_kegiatan })
                })
            }
        )
    }

    getOrganik = (month, cb) => {
        this.props.socket.emit(
            'api.socket.penilaian/s/getSemuaOrganik',
            { month },
            (response) => {
                getSemuaOrganik(response, this.props, this.state.month, (result) => {
                    this.setState(result, () => {
                        cb && cb();
                    })
                })
            }
        )
    }

    onClickApproved = (_id, all_spd_id, isApproved) => {
        this.props.socket.emit(
            'api.socket.penilaian/s/setApproved',
            { _id, all_spd_id, month: this.state.month, isApproved },
            (response) => {
                onClickApprovedResponseHandle(response, this.state, _id, isApproved, this.props, (result) => {
                    this.setState(result, () => this.props.showSuccessMessage("Berhasil dikirim."))
                })
            }
        )
    }


    UNSAFE_componentWillReceiveProps = (prevProps) => {
        const { seksi, tahun_anggaran } = prevProps.active_user;
        if (seksi && tahun_anggaran) {
            const { seksi, tahun_anggaran } = prevProps.active_user;
            setTimeout(() => {
                let { month } = this.state;
                if (+tahun_anggaran < moment().year()) {
                    month = 11;
                    this.setState({ month: 11 })
                }
                this.getOrganik(month, () => this.getKegiatan(month, seksi));
            }, 100)
        }
    }
    render() {
        const { semua_organik, semua_kegiatan, month, seksi } = this.state;
        const { tahun_anggaran, nmjab } = this.props.active_user;
        const nilai_seksi = getAllSeksiKinerja(semua_kegiatan, semua_organik, tahun_anggaran, month);
        const progressEntri = getProgressEntri(
            semua_kegiatan, semua_organik, seksi, tahun_anggaran, month
        )
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
                <Col xs={4} push={15}>
                    <a href='/'>
                        <Button type="primary">Lihat Penilaian</Button>
                    </a>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: 10 }}>
                {["Tata Usaha", "Sosial", "Produksi",
                    "Distribusi", "Nerwilis", "IPDS"].map(seksi => <Col span={4}>
                        <Card title={seksi} bordered={true}>
                            Progress entri:
                            <Tooltip title="Progress entri Tukin">
                                <Progress percent={progressEntri[seksi]} status={progressEntri[seksi]<100?"active":"success"} />
                            </Tooltip>
                            Kinerja:
                            <Tooltip title="Kinerja seksi">
                                <Typography style={{ textAlign: "center" }}>
                                    <Typography.Title level={4}>{nilai_seksi[seksi].toFixed(2)}</Typography.Title>
                                </Typography>
                            </Tooltip>
                        </Card>
                    </Col>)}
            </Row>
            <Row gutter={24} type="flex">
                <Col xs={24}>
                    <TableSummary
                        columns={columns(
                            semua_kegiatan,
                            semua_organik,
                            nilai_seksi,
                            tahun_anggaran,
                            month,
                            this.onClickApproved,
                            nmjab ? /kepala\sbps|kepala\sbadan/i.test(nmjab) : false
                        )}
                        data={semua_organik}
                        tahun_anggaran={tahun_anggaran}
                        month={month}
                        semua_kegiatan={semua_kegiatan} />
                </Col>
            </Row>
        </Fragment>
    }
}