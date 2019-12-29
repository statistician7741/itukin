import { Table, Timeline, Tag } from 'antd'
import dynamic from 'next/dynamic';
const moment = require("moment");
moment.locale("id")

const detailPenilaian = (record, index, indent, expanded) => {
    return <div>
        Hello World
    </div>
}

export default ({ data, columns }) => {
    return <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        size="small"
        bordered
        pagination={false}
    />
}