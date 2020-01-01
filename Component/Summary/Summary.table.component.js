import { Table, Row, Col } from 'antd'
import { Fragment } from 'react';
const moment = require("moment");
moment.locale("id")
import hitungKinerja from "./Summary.function/hitungKinerja"

const detailPenilaian = (record, index, indent, expanded, semua_kegiatan, tahun_anggaran, month) => {
    return <Fragment>
        <Row>
            <Col xs={24}><strong>Detail Penilaian Kinerja (Perjalanan Dinas)</strong></Col>
        </Row>
        {['Tata Usaha', 'Sosial', 'Produksi', 'Distribusi', 'Nerwilis', 'IPDS'].map(seksi => (
            <Row>
                <Col xs={24}>{seksi} : <strong>{hitungKinerja(record, semua_kegiatan, undefined, tahun_anggaran, month, seksi)}</strong></Col>
            </Row>
        ))}
    </Fragment>
}

export default ({ data, columns, semua_kegiatan, tahun_anggaran, month }) => {
    return <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        size="small"
        bordered
        pagination={false}
        expandedRowRender={(record, index, indent, expanded) => detailPenilaian(record, index, indent, expanded, semua_kegiatan, tahun_anggaran, month)}
    />
}