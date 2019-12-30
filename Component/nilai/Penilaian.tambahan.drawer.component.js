import { Drawer, Row, Col, Button, Collapse } from 'antd';
import moment from 'moment';
const { Panel } = Collapse;

import dynamic from 'next/dynamic';
const DrawerKegBaru = dynamic(() => import("./Penilaian.tambahan.drawer.children.componen"));

export default class TambahanDrawer extends React.Component {
    state = {
        title: "Tambah Penilaian",
        edit_new_drawerVisible: false,
        activeKey: undefined,
        baru_nama_keg: undefined,
        baru_petugas: [],
        baru_bulan_penilaian: []
    }

    onCloseNewEditDrawer = () => this.setState({ edit_new_drawerVisible: false })
    showNewEditDrawer = () => this.setState({ edit_new_drawerVisible: true })
    onChangeBaruNamaKeg = ({ target: { value } }) => this.setState({ baru_nama_keg: value })
    onChangeBaruPetugas = (newPetugasArr) => this.setState({ baru_petugas: newPetugasArr })
    onChangeBaruBulan = (newBulanArr) => this.setState({ baru_bulan_penilaian: newBulanArr })
    onClickSimpanKegBaru = () => {
        const { baru_nama_keg, baru_petugas, baru_bulan_penilaian } = this.state;
        if (!baru_nama_keg || !baru_petugas.length || !baru_bulan_penilaian) {
            this.props.showErrorMessage("Mohon lengkapi semua isian.")
            return;
        }
        const { socket, seksi, month } = this.props;
        socket.emit(
            'api.socket.penilaian/s/onClickSimpanKegBaru',
            { baru_nama_keg, baru_petugas, baru_bulan_penilaian, seksi },
            (response) => {
                if (response.type === 200) {
                    this.props.showSuccessMessage("Berhasil ditambahkan.")
                    this.props.getOrganik(month)
                } else {
                    this.props.showErrorMessage("Terjadi error.")
                }
            })
    }

    render() {
        const { edit_new_drawerVisible, activeKey, title } = this.state;
        const { showTambahanPenilaianDrawer, onCloseTambahanDrawer, month } = this.props;
        return <Drawer
            title={`Poin Penilaian Tambahan (${moment().month(month).format('MMMM YYYY')})`}
            width={640}
            placement="right"
            closable={false}
            onClose={onCloseTambahanDrawer}
            visible={showTambahanPenilaianDrawer}
        >
            <Row style={{ marginBottom: 10 }}>
                <Col>
                    <Button type="primary" onClick={this.showNewEditDrawer} icon="plus">Baru</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Collapse
                        accordion={true}
                        onChange={(activeKey) => this.setState({ activeKey })}
                        expandIconPosition={"left"}
                    >
                        <Panel
                            header="Digitasi Pemetaan"
                        >
                            Hello World!
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <DrawerKegBaru
                title={title}
                onClose={this.onCloseNewEditDrawer}
                visible={edit_new_drawerVisible}
                onChangeBaruNamaKeg={this.onChangeBaruNamaKeg}
                onChangeBaruPetugas={this.onChangeBaruPetugas}
                onChangeBaruBulan={this.onChangeBaruBulan}
                onClickSimpanKegBaru={this.onClickSimpanKegBaru}
                {...this.state}
                {...this.props}
            />
        </Drawer>
    }
}