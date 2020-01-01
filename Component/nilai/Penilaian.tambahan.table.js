import { Table } from 'antd'
const moment = require("moment");
moment.locale("id")

export default ({ data, columns}) => {
    return <Table columns={columns}
        dataSource={data}
        size="small"
        bordered
        pagination={false}
    />
}