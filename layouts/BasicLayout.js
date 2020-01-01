import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { Avatar, Dropdown, Icon, Layout, Menu, Tag } from "antd";
const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;

import Link from "next/link";

// import routes from "../config/routes.config";
import { toggleSideMenuCollapsed } from '../redux/actions/layout.action'
import { kab, prov } from '../config/env.config'
import "./BasicLayout.less"


class BasicLayout extends React.Component {
//   toggle = () => {
//     const { toggleSideMenuCollapsed } = this.props
//     toggleSideMenuCollapsed(!this.props.sideMenuCollapsed)
//   };

  render() {
    const { active_user, isMobile } = this.props
    const menu = (
      <Menu className={'menu'} selectedKeys={[]}>
        <Menu.Item key="userCenter">
          <Link href='/api/login/out'>
            <div><Icon type="logout" /> Logout</div>
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
            <span style={{float: "left", paddingLeft: 25}}><Link href="/"><a><img className="logo" src={`/static/logo1.png`} /></a></Link></span>
            <span>{active_user.tahun_anggaran?<span><Tag color="#1DA57A">T.A. {active_user.tahun_anggaran}</Tag> <Tag color="#1DA57A">{active_user.seksi}</Tag></span>:<Icon type='loading'/>}</span>
            <span className="right">
              <Dropdown overlay={menu}>
                <span className={`action account`}>
                  <Avatar
                    className={'avatar'}
                  >{active_user.nama?active_user.nama[0]:<Icon type='loading'/>}</Avatar>
                  {isMobile === undefined || isMobile === false?<span className={'name'}>{active_user.nama?active_user.nama:<Icon type='loading'/>}</span>:null}
                </span>
              </Dropdown>
            </span>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            BPS {kab}, {prov} ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ layout, organik }) {
  const { sideMenuCollapsed } = layout
  const { active_user } = organik
  return { sideMenuCollapsed, active_user }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSideMenuCollapsed: bindActionCreators(toggleSideMenuCollapsed, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)