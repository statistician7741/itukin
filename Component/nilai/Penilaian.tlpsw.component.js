import { Table } from 'antd';

import columns from "./Penilaian.absensi.column.component";

export default ({ data, onClickEditPenilaian, onClickKirimPenilaian, onChangeAbsensi, onChangeDailyCuti }) => {
    return <Table columns={columns(onClickEditPenilaian, onClickKirimPenilaian, onChangeAbsensi, onChangeDailyCuti)}
        scroll={{ x: 1650, y: 768 }}
        rowKey="_id"
        dataSource={data}
        size="small"
        bordered
        pagination={false}
    />
}