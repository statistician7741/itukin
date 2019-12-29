import { Table, Timeline, Tag } from 'antd'
import dynamic from 'next/dynamic';
const PenilaianItem = dynamic(() => import("./Penilaian.timeline.component"));
const moment = require("moment");
moment.locale("id")

import { getDateRange, getNomorSPD } from '../../functions/clientServerValid.function'

const detailKegiatan = (record, index, indent, expanded) => {
    return <div>
        <div style={{ marginBottom: 5 }}>
            <Tag color="#108ee9">{getNomorSPD(record)}</Tag>
            <Tag color="#108ee9">{getDateRange(record.waktu)}</Tag>
            <Tag color="#f50">{`${record.target.jumlah} ${record.target.satuan}`}</Tag>
        </div>
        <Timeline>
            {record.progress ? (record.progress.length ? (record.progress.map(p => <PenilaianItem
                key={p._id}
                tgl={`${moment(p.time).format("dddd")}, ${moment(p.time).format("DD/MM/YYYY HH:mm")}`}
                keterangan={p.catatan.text}
                photoUrl={p.bukti_foto.map(f => (`http://${window.location.hostname}/static/bukti_foto/${f}`))}
            />)) : <div>Belum ada progress!</div>) : <div>Belum ada progress!</div>}
        </Timeline>
    </div>
}

export default ({ data, columns }) => {
    return <Table columns={columns}
        dataSource={data}
        size="small"
        expandedRowRender={detailKegiatan}
        bordered
        pagination={false}
    />
}