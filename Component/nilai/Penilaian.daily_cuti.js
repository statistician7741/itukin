import { Table } from 'antd';

import columns from "./Penilaian.daily_cuti.column.component";

export default ({ data, onClickEditPenilaian, onClickKirimPenilaian, onChangeDailyCuti }) => {
    return <Table columns={columns(onClickEditPenilaian, onClickKirimPenilaian, onChangeDailyCuti)}
        rowKey="_id"
        dataSource={data}
        size="small"
        bordered
        pagination={false}
    />
}