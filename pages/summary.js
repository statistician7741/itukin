import React from 'react'
import { connect } from 'react-redux';
import BasicLayout from "../layouts/BasicLayout";
import { Row, Col, Card } from 'antd';

import dynamic from 'next/dynamic';

class Index extends React.Component {
    static async getInitialProps({ req, res }) {
        return {}
    }

    render() {
        return (
            <BasicLayout isMobile={this.props.isMobile} router={this.props.router}>
                <Row gutter={24} type="flex">
                    <Col xs={6}>
                        <Card bodyStyle={{ padding: '20px 24px 8px 24px' }}>
                            Hello world!
                        </Card>
                    </Col>
                </Row>
            </BasicLayout>
        )
    }
}

function mapStateToProps(state) {
    const { socket } = state.socket
    return { socket }
}

export default connect(mapStateToProps)(Index)