import React from 'react'
import { connect } from 'react-redux';
import BasicLayout from "../layouts/BasicLayout";
import { Row, Col, Card } from 'antd';

import dynamic from 'next/dynamic';
const Main = dynamic(()=>import('../Component/Summary/Main.component'))

class Index extends React.Component {
    static async getInitialProps({ req, res }) {
        return {}
    }

    render() {
        return (
            <BasicLayout isMobile={this.props.isMobile} router={this.props.router}>
                <Main {...this.props} />
            </BasicLayout>
        )
    }
}

function mapStateToProps(state) {
    const { socket } = state.socket
    const { active_user } = state.organik
    return { socket, active_user }
}

export default connect(mapStateToProps)(Index)