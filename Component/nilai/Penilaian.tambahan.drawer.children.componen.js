import { Drawer, Col, Row, Input, Checkbox, Button, Icon, Select } from 'antd';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

import './Penilaian.less';

export default class DrawerChildren extends React.Component {
    render() {
        const {
            onClose,
            visible,
            title,
            semua_organik,
            baru_nama_keg,
            baru_petugas,
            baru_bulan_penilaian,
            onChangeBaruNamaKeg,
            onChangeBaruPetugas,
            onChangeBaruBulan,
            onClickSimpanKegBaru } = this.props;
        return <Drawer
            title={title}
            width={600}
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
        >
            <Row>
                <Col xs={24}>
                    <Input
                        size="large"
                        placeholder="Nama kegiatan/poin penilaian tambahan"
                        value={baru_nama_keg}
                        onChange={onChangeBaruNamaKeg}
                        prefix={<Icon type="notification" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        allowClear />
                </Col>
            </Row>
            <Row style={{ margin: "10px 0 10px 0" }}>
                <Col xs={24}>
                    <Select
                        allowClear
                        mode="tags"
                        size="large"
                        onChange={onChangeBaruPetugas}
                        optionFilterProp="label"
                        optionLabelProp="label"
                        placeholder="Pilih organik..."
                        prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        style={{ width: '100%' }}
                        value={baru_petugas}
                        labelInValue
                    >
                        {semua_organik.map((organik) => {
                            return <Option key={organik._id} value={organik._id} label={organik.nama}>{organik.nama}<span className="certain-search-item-nip">NIP: {organik._id}</span></Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <div><strong>Bulan Penilaian</strong></div>
                    <div><a href="#" onClick={() => onChangeBaruBulan([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])}>Pilih semua bulan</a></div>
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
                        ]}
                            value={baru_bulan_penilaian}
                            onChange={onChangeBaruBulan}

                        />
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
                <Button size="large" style={{ marginRight: 8 }} onClick={onClose}>Batal</Button>
                <Button size="large" onClick={onClickSimpanKegBaru} type="primary">Simpan</Button>
            </div>
        </Drawer>
    }
}