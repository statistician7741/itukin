import React from 'react'
import { connect } from 'react-redux';
import BasicLayout from "../layouts/BasicLayout";

// import routes from '../config/routes.config'

import dynamic from 'next/dynamic';

const Penilaian = dynamic(() => import("../component/nilai/Penilaian.component"));

class Index extends React.Component {
  static async getInitialProps({ req, res }) {
    return {}
  }

  render() {
    return (
      <BasicLayout isMobile={this.props.isMobile} router={this.props.router}>
        <Penilaian {...this.props} />
      </BasicLayout>
    )
  }
}

function mapStateToProps(state) {
  const { socket } = state.socket
  return { socket }
}

export default connect(mapStateToProps)(Index)