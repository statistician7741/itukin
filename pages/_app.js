import App, { Container } from 'next/app'
import Head from 'next/head'
import { initStore } from '../redux/store'
import io from "socket.io-client";
import { Icon, message, notification } from 'antd'
import { Provider } from 'react-redux'
import React from 'react'
import { setSocket } from '../redux/actions/socket.action'
import withRedux from "next-redux-wrapper";

// import { setActiveUser } from "../redux/actions/organik.action"

import { kab } from "../config/env.config.js"

import style from './_app.less';

// const loopRoutes = (routes, router, results) => {
//   if (routes.routes) {
//     for (var i = 0; i < routes.routes.length; i++) {
//       loopRoutes(routes.routes[i], router, results)
//     }
//   } else {
//     if (routes.path.indexOf(router.asPath) != -1) {
//       results.push(routes.name)
//     }
//   }
// }

// const getTitle = (routes, router) => {
//   var results = [];
//   for (let key in routes) {
//     loopRoutes(routes[key], router, results)
//   }
//   return results[0]
// }

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    // const isMobile = /(Mobile)/.test(userAgent)
    // pageProps.router = router;
    // pageProps.isMobile = isMobile;

    return { pageProps }
  }

  showInfoMessage = (msg) => {
    message.info(msg);
  }

  showSuccessMessage = (msg) => {
    message.success(msg);
  }

  showWarningMessage = (msg) => {
    message.warning(msg);
  }

  showErrorMessage = (msg) => {
    message.error(msg);
  }

  handleOnDisconnect = () => {
    notification.open({
      message: 'Koneksi terputus',
      description: 'Koneksi ke server terputus, mohon periksa internet Anda.',
      icon: <Icon type="disconnect" />,
      duration: 0
    });
  };

  handleOnConnect = () => {
    notification.destroy()
  };

  componentDidMount = () => {
    if (!this.props.store.getState().socket.socket) {
      const socket = io.connect(`http://${window.location.hostname}:81`, { secure: false });
      this.props.store.dispatch(setSocket(socket))
      // this.props.store.dispatch(setActiveUser(socket))
      socket.on('disconnect', this.handleOnDisconnect)
      socket.on('connect', this.handleOnConnect)
      // socket.on('api.login/c/doYouHaveLoginSomewhere', (login_user_id, cb)=>{
      //   const current_user = this.props.store.getState().organik.active_user
      //   if(current_user._id && (current_user._id === login_user_id)){
      //     cb({type: 'error', data: `${current_user.nama} sedang login di komputer lain.`})
      //   } else{
      //     cb({type: 200, data: 'Di komputer ini tidak.'})
      //   }
      // })
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Head>
            <title>{`iTukin - BPS ${kab}`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
            {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDuRzGuN2nbkusHMzwx63xU4FqPBFPDhk8&callback=initMap"
              async defer></script> */}
          </Head>
          <Component
            {...pageProps}
            showSuccessMessage = {this.showSuccessMessage}
            showErrorMessage = {this.showErrorMessage}
            showInfoMessage = {this.showInfoMessage}
            showWarningMessage = {this.showWarningMessage}
          />
        </div>
      </Provider>
    )
  }
}

export default withRedux(initStore)(MyApp);