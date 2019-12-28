import { Table, Progress, Timeline, Slider } from 'antd'
import dynamic from 'next/dynamic';
const PenilaianItem = dynamic(() => import("./Penilaian.timeline.component"));
const moment = require("moment");
moment.locale("id")

const detailKegiatan = (record, index, indent, expanded) => {
    return <Timeline>
        {record.progress ? (record.progress.length ? (record.progress.map(p => <PenilaianItem
            key={p._id}
            tgl={`${moment(p.time).format("dddd")}, ${moment(p.time).format("DD/MM/YYYY HH:mm")}`}
            keterangan={p.catatan.text}
            photoUrl={p.bukti_foto.map(f => (`http://${window.location.hostname}/static/bukti_foto/${f}`))}
        />)) : <span>Belum ada progress!</span>) : <span>Belum ada progress!</span>}
    </Timeline>
}

export default ({ data, columns }) => {
    return <Table columns={columns}
        dataSource={data}
        size="small"
        expandedRowRender={detailKegiatan}
        bordered
        pagination = {false}
    />
}