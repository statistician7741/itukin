import React from 'react'
import Router from 'next/router'
import { Collapse, Icon, Select, Table, Divider, Tag, Progress, Row, Col } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;
// import routes from '../config/routes.config'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genTitle = (title, progr) => (
  <span>{title} <span style={{ float: "Right", width: 100 }}><Progress percent={progr} size="small" /></span></span>
);

const columns = [
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Sanur Saprah, SE',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Asri Samsu Alam, SE',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Sapari',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    // const isMobile = /(Mobile)/.test(userAgent)
    // if (res) {
    //   res.writeHead(302, {
    //     Location: `https://${req.hostname}/`
    //   })
    //   res.end()
    // } else {
    //   Router.push(routes["root"].redirect)
    // }
    return {}
  }

  render() {
    return (
      <Row>
        <Col sm={24}>
          <Collapse
            accordion
            defaultActiveKey={['1']}
            onChange={() => console.log("Callback of Collapse")}
            expandIconPosition={"left"}
          >
            <Panel header={genTitle("Pencacahan Survei VHT-S bulan Desember 2019", 100)} key="1">
              <Table columns={columns} dataSource={data} />
            </Panel>
            <Panel header={genTitle("Pencacahan Sampel Survei HPG Desember 2019", 78)} key="2">
              <Table columns={columns} dataSource={data} />
            </Panel>
            <Panel header={genTitle("Pencacahan Survei Harga Mesin dan Peralatan (SHMP) Triwulan IV Tahun 2019", 32)} key="3">
              <Table columns={columns} dataSource={data} />
            </Panel>
            <Panel header={genTitle("Pengawasan Pencacahan HD Desember 2019", 0)} key="3">
              <Table columns={columns} dataSource={data} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    )
  }
}