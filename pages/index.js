import React from 'react'
import Router from 'next/router'
import { Divider, Tag, Progress } from 'antd';
import { connect } from 'react-redux';
import BasicLayout from "../layouts/BasicLayout";

// import routes from '../config/routes.config'

import dynamic from 'next/dynamic';

const Penilaian = dynamic(() => import("../component/nilai/Penilaian.componen"));

export default class extends React.Component {
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