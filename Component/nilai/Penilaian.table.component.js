import { Table, Progress, Timeline, Slider } from 'antd'
import dynamic from 'next/dynamic';
const PenilaianItem = dynamic(() => import("./Penilaian.timeline.component"));

const detailKegiatan = (record, index, indent, expanded) => {
    return <Timeline>
        <PenilaianItem
            key="1"
            tgl="24 Desember 2019"
            keterangan="Mencacah Kamboja Unggas dari pukul 07.34 - 09.21. Harga ayam ras dan dagingnya naik rp.5000."
            photoUrl={["/static/bukti_foto/1.jpeg", "/static/bukti_foto/2.jpeg", "/static/bukti_foto/3.jpeg"]} />
        <PenilaianItem
            key="2"
            tgl="23 Desember 2019"
            keterangan="Mencacah Kamboja Unggas dari pukul 07.34 - 09.21. Harga ayam ras dan dagingnya naik rp.5000."
            photoUrl={["/static/bukti_foto/3.jpeg", "/static/bukti_foto/4.jpeg"]} />
        <PenilaianItem
            key="3"
            tgl="22 Desember 2019"
            keterangan="Mencacah Kamboja Unggas dari pukul 07.34 - 09.21. Harga ayam ras dan dagingnya naik rp.5000."
            photoUrl={["/static/bukti_foto/5.jpeg", "/static/bukti_foto/6.jpeg"]} />
        <PenilaianItem
            key="4"
            tgl="21 Desember 2019"
            keterangan="Mencacah Kamboja Unggas dari pukul 07.34 - 09.21. Harga ayam ras dan dagingnya naik rp.5000."
            photoUrl={["/static/bukti_foto/7.jpeg", "/static/bukti_foto/8.jpeg"]} />
    </Timeline>
}

export default ({ data, columns }) => {
    return <Table columns={columns}
        dataSource={data}
        size="small"
        expandedRowRender={detailKegiatan}
        bordered
    />
}