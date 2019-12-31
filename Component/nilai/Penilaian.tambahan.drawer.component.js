import { Drawer, Row, Col, Button, Collapse, Popconfirm } from 'antd';
import moment from 'moment';
const { Panel } = Collapse;

import dynamic from 'next/dynamic';
const DrawerKegBaru = dynamic(() => import("./Penilaian.tambahan.drawer.children.componen"));

const genTitle = (title, key, stateKey) => (
    <span>{key === stateKey ? <strong>{title}</strong> : title}</span>
);

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
                    this.props.getOrganik(month, seksi)
                } else {
                    this.props.showErrorMessage("Terjadi error.")
                }
            })
    }

    render() {
        const { edit_new_drawerVisible, activeKey, title } = this.state;
        const { showTambahanPenilaianDrawer, onCloseTambahanDrawer, month, semua_tambahan_kegiatan } = this.props;
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
                        {semua_tambahan_kegiatan.length ? semua_tambahan_kegiatan.map((t_g, i) => <Panel header={genTitle(t_g.title, t_g.title, activeKey)} key={t_g.title}
                        >
                            Petugas: {t_g.data.map(organik => <div>{organik.nama}</div>)}
                            <Button size="large" icon="edit" />
                            <Popconfirm title={`Hapus poin penilaian ini?`} onConfirm={() => console.log("Hapus")}>
                                <Button size="large" style={{ marginLeft: 5 }} icon="delete" />
                            </Popconfirm>
                        </Panel>) : <Panel
                            header="Tidak ada tambahan poin penilaian"
                            key="none"
                        >
                                Silahkan tambah Penilaian Baru.
                        </Panel>}
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