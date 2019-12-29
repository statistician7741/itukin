import { Table } from 'antd';

import columns from "./Penilaian.absensi.column.component";

export default ({ data, onClickEditPenilaian, onClickKirimPenilaian, onChangeAbsensi }) => {
    return <Table columns={columns(onClickEditPenilaian, onClickKirimPenilaian, onChangeAbsensi)}
        rowKey="_id"
        dataSource={data}
        size="small"
        bordered
        pagination={false}
    />
}