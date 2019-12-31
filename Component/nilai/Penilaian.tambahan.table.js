import { Table } from 'antd'
const moment = require("moment");
moment.locale("id")
import { getDateRange, getNomorSPD, setTujuanInput } from '../../functions/clientServerValid.function';

export default ({ data, ok}) => {
    return <Table columns={columns}
        dataSource={data}
        size="small"
        bordered
        pagination={false}
    />
}