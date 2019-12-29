import { Drawer, Row, Col, Button, Collapse, Input, Icon, Checkbox } from 'antd';
import moment from 'moment';
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

export default class TambahanDrawer extends React.Component {
    state = {
        edit_new_drawerVisible: false,
        activeKey: undefined
    }

    onCloseNewEditDrawer = () => this.setState({ edit_new_drawerVisible: false })
    showNewEditDrawer = () => this.setState({ edit_new_drawerVisible: true })

    render() {
        const { edit_new_drawerVisible, activeKey } = this.state;
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
            <Drawer
                title="Tambah Penilaian"
                width={600}
                placement="right"
                closable={false}
                onClose={this.onCloseNewEditDrawer}
                visible={edit_new_drawerVisible}
            >
                <Row>
                    <Col xs={24}>
                        <Input
                            size="large"
                            placeholder="Nama kegiatan/poin penilaian tambahan"
                            prefix={<Icon type="notification" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            allowClear />
                    </Col>
                </Row>
                <Row style={{margin: "10px 0 10px 0"}}>
                    <Col xs={24}>
                        <Input
                            size="large"
                            placeholder="Petugas"
                            prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            allowClear />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24}>
                        <div><strong>Bulan Penilaian</strong></div>
                        <div>
                            <CheckboxGroup options={[
                                { label: 'Januari', value: 0 },
                                { label: 'Februari', value: 1 },
                                { label: 'Maret', value: 2 },
                                { label: 'April', value: 3 },
                                { label: 'Mei', value: 4 },
                                { label: 'Juni', value: 5 },
                                { label: 'Juli', value: 6 },
                                { label: 'Agustus', value: 7 },
                                { label: 'September', value: 8 },
                                { label: 'Oktober', value: 9 },
                                { label: 'November', value: 10 },
                                { label: 'Desember', value: 11 },
                            ]}/>
                        </div>
                    </Col>
                </Row>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button size="large" style={{ marginRight: 8 }} onClick={this.onCloseNewEditDrawer}>Batal</Button>
                    <Button size="large" onClick={this.onCloseNewEditDrawer} type="primary">Simpan</Button>
                </div>
            </Drawer>
        </Drawer>
    }
}