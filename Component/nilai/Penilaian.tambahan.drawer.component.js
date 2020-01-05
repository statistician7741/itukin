import { Drawer, Row, Col, Button, Collapse, Popconfirm, Icon } from 'antd';
import moment from 'moment';
const _ = require('lodash')
const { Panel } = Collapse;

import dynamic from 'next/dynamic';
const DrawerKegBaru = dynamic(() => import("./Penilaian.tambahan.drawer.children.componen"));
import getTembahanKegByKegNama from "./Penilaian.function/getTembahanKegByKegNama"

const genTitle = (title, key, stateKey) => (
    <span>{key === stateKey ? <strong>{title}</strong> : title}</span>
);

export default class TambahanDrawer extends React.Component {
    state = {
        title: "Tambah Penilaian Baru",
        edit_new_drawerVisible: false,
        activeKey: undefined,
        baru_nama_keg: undefined,
        baru_nama_keg_editing_target: undefined,
        baru_petugas: [],
        baru_petugas_editing_target: [],
        baru_bulan_penilaian: [],
        baru_bulan_penilaian_editing_target: []
    }

    onCloseNewEditDrawer = () => this.setState({
        edit_new_drawerVisible: false,
        title: "Tambah Penilaian Baru",
        edit_new_drawerVisible: false,
        activeKey: undefined,
        baru_nama_keg: undefined,
        baru_nama_keg_editing_target: undefined,
        baru_petugas: [],
        baru_petugas_editing_target: [],
        baru_bulan_penilaian: [],
        baru_bulan_penilaian_editing_target: []
    })
    showNewEditDrawer = () => this.setState({ edit_new_drawerVisible: true, title: "Tambah Penilaian Baru" })
    onChangeBaruNamaKeg = ({ target: { value } }) => this.setState({ baru_nama_keg: value })
    onClickDelete = () => {
        const { baru_nama_keg, baru_petugas, baru_bulan_penilaian } = this.state;
        if (!baru_nama_keg || !baru_petugas.length || !baru_bulan_penilaian) {
            this.props.showErrorMessage("Tidak bisa menghapus jika ada isian yang kosong.")
            return;
        }
        const { socket, month, seksi, tahun_anggaran } = this.props;
        socket.emit(
            'api.socket.penilaian/s/deleteKegTambahan', {
            _ids: baru_petugas.map(o => o.key),
            keg_nama: baru_nama_keg,
            seksi,
            months: baru_bulan_penilaian
        },
            (response) => {
                if (response.type === 200) {
                    this.props.getOrganik(month, seksi, tahun_anggaran)
                    this.props.showSuccessMessage("Berhasil dihapus.")
                    this.onCloseNewEditDrawer();
                } else {
                    this.props.showErrorMessage("Terjadi error.")
                }
            })
    }
    onChangeBaruPetugas = (newPetugasArr) => {
        this.setState({ baru_petugas: newPetugasArr })
    }
    onChangeBaruBulan = (newBulanArr) => this.setState({ baru_bulan_penilaian: newBulanArr })
    onClickSimpanKegBaru = () => {
        const {
            baru_nama_keg, baru_petugas, baru_bulan_penilaian,
            baru_nama_keg_editing_target, baru_petugas_editing_target, baru_bulan_penilaian_editing_target,
        } = this.state;
        if (!baru_nama_keg || !baru_petugas.length || !baru_bulan_penilaian) {
            this.props.showErrorMessage("Mohon lengkapi semua isian.")
            return;
        }
        if (baru_nama_keg_editing_target) { //edit
            //1. cek nama organik, jika ada yg hilang, maka hapus semua yg hilang
            const id_yg_hilang = baru_petugas_editing_target.filter(o=>{
                return _.find(baru_petugas, ['key', o.key])?false:true
            })
            const id_yg_nambah = baru_petugas.filter(bo=>{
                return _.find(baru_petugas_editing_target, ['key', bo.key])?false:true
            })
            // console.log(baru_petugas_editing_target.map(o=>o.nama), baru_petugas.map(o=>o.label));
            console.log(id_yg_hilang, id_yg_nambah);
            // console.log(id_yg_hilang, id_yg_nambah);
            //2. cek bulan, jika ada yg hilang, hapus bulan yang hilang
            //3. cek nama keg, jika berubah, update ke nama
            this.props.showErrorMessage("Maaf, fitur ini sedang dalam pengembangan.")
            return;
        }
        const { socket, seksi, month, tahun_anggaran } = this.props;
        socket.emit(
            'api.socket.penilaian/s/onClickSimpanKegBaru',
            { baru_nama_keg, baru_petugas, baru_bulan_penilaian, seksi },
            (response) => {
                if (response.type === 200) {
                    this.props.getOrganik(month, seksi, tahun_anggaran)
                    this.props.showSuccessMessage("Berhasil ditambahkan.")
                    this.onCloseNewEditDrawer()
                } else {
                    this.props.showErrorMessage("Terjadi error.")
                }
            })
    }
    genExtra = ({ title, seksi, semua_organik, tahun_anggaran }) => (
        <Icon
            type="edit"
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
                const semua_tambahan_kegiatan_by_keg_nama = getTembahanKegByKegNama(seksi, semua_organik, tahun_anggaran)
                this.setState({
                    edit_new_drawerVisible: true,
                    title: "Edit Penilaian Tambahan: " + title,
                    baru_nama_keg: title,
                    baru_nama_keg_editing_target: title,
                    baru_petugas: _.uniqBy(semua_tambahan_kegiatan_by_keg_nama[title].data, 'nip').map(org => ({ key: org.nip, nama: org.nama })),
                    baru_petugas_editing_target: _.uniqBy(semua_tambahan_kegiatan_by_keg_nama[title].data, 'nip').map(org => ({ key: org.nip, nama: org.nama })),
                    baru_bulan_penilaian: _.uniq(semua_tambahan_kegiatan_by_keg_nama[title].bulan).map(b => +b),
                    baru_bulan_penilaian_editing_target: _.uniq(semua_tambahan_kegiatan_by_keg_nama[title].bulan).map(b => +b)
                })
            }}
        />
    )

    render() {
        const { edit_new_drawerVisible, activeKey, title } = this.state;
        const { showTambahanPenilaianDrawer, onCloseTambahanDrawer, month,
            semua_tambahan_kegiatan, semua_organik, seksi, tahun_anggaran } = this.props;
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
                        {semua_tambahan_kegiatan.length ? semua_tambahan_kegiatan.map((t_g, i) => <Panel
                            header={genTitle(t_g.title, t_g.title, activeKey)}
                            key={t_g.title}
                            extra={this.genExtra({ title: t_g.title, seksi, semua_organik, tahun_anggaran })}
                        >
                            Petugas: {t_g.data.map(organik => <div>{organik.nama}</div>)}
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
                onClickDelete={this.onClickDelete}
                {...this.state}
                {...this.props}
            />
        </Drawer>
    }
}