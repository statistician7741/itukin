import { Timeline, Icon, Col, Row } from 'antd';

export default ({ key, tgl, jumlah, satuan, keterangan, photoUrl }) => {
    return <Timeline.Item key={key}>
        <Row>
            <Col><strong>{`[${jumlah} ${satuan}] ${tgl}`}</strong></Col>
        </Row>
        <Row style={{ marginBottom: 6 }}>
            <Col>
                <i>{keterangan}</i>
            </Col>
        </Row>
        <Row type="flex" justify="start" gutter={[20, 0]}>
            {photoUrl.map(photo => (<Col key={photo}>
                <img style={{ width: 'auto', height: 200, borderRadius: 5 }} src={photo} />
            </Col>))}
        </Row>
    </Timeline.Item>
}