import { connect } from 'react-redux';
import { Alert, Button, Form, Icon, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import axios from 'axios'

import Link from "next/link";

import { resetActiveUser } from '../redux/actions/organik.action'
import { kab } from '../config/env.config'

import "./login.less"
import logo from '../public/static/logo2.png';

class Login extends React.Component {
    static async getInitialProps({ req, res }) {
        return {}
    }
    state = {
        errMsg: undefined,
        loading: false,
        tahun_anggaran: [new Date().getFullYear()]
    }

    componentDidMount = () => {
        this.input.focus()
        this.props.dispatch(resetActiveUser())
        setTimeout(() => {
            const { socket } = this.props;
            if (socket) {
                socket.emit('api.socket.pok/s/getTahunAnggaran', (response) => {
                    if (response.type === 200) this.setState({ tahun_anggaran: response.data });
                })
            }
        }, 100)
    }

    saveInputRef = input => this.input = input

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return
            values.username = values.username.toLowerCase()
            this.setState({ loading: true, errMsg: undefined }, () => {
                axios.post('/api/login', values)
                    .then((response) => {
                        if (response.data === 200) {
                            window.open('/', "_top")
                            return
                        } else if (response.data === 422) {
                            this.setState({ errMsg: 'Username atau password salah.' })
                        } else {
                            this.setState({ errMsg: response.data })
                        }
                        this.setState({ loading: false });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({ loading: false });
                    });
            })
        });
    };

    render() {
        const { errMsg, loading, tahun_anggaran } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={'login_container'}>
                <div className={'login_content'}>
                    <div className={'login_top'}>
                        <div className={'login_header'}>
                            <Link href="/">
                                <div>
                                    <img src={logo} className={'login_logo'} />
                                    <span className={'login_title'}>BPS {kab}</span>
                                </div>
                            </Link>
                        </div>
                        <div className={'login_desc'}>iTukin, Menuju Wilayah Bebas Korupsi (WBK), Wilayah Birokrasi Bersih Melayani (WBBM)</div>
                    </div>
                    <div className={'login_main'}>
                        {errMsg ? (
                            <Alert
                                message={errMsg}
                                type="error"
                                showIcon
                                closable
                                onClose={this.onClose}
                                style={{ marginBottom: '21px' }}
                            />
                        ) : null}
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator("tahun_anggaran", {
                                    rules: [
                                        { required: true, message: "Mohon pilih tahun anggaran." }
                                    ],
                                    initialValue: new Date().getFullYear()
                                })(
                                    <Select
                                        prefix={
                                            <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        type="string"
                                        placeholder="Tahun Anggaran"
                                        size='large'
                                        autoComplete="off"
                                        disabled={loading}
                                    >
                                        {tahun_anggaran.map((a, i) => <Option key={i} value={a}><strong>TAHUN ANGGARAN {a}</strong></Option>)}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("username", {
                                    rules: [
                                        { required: true, message: "Mohon input username Anda." }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        ref={this.saveInputRef}
                                        type="string"
                                        placeholder="username"
                                        size='large'
                                        autoComplete="off"
                                        disabled={loading}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [
                                        { required: true, message: "Mohon input password Anda." }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        type="password"
                                        placeholder="password"
                                        size='large'
                                        autoComplete="off"
                                        disabled={loading}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    size='large'
                                    className={'login_submit'}
                                    loading={this.state.loading}
                                    onClick={this.enterLoading}
                                >
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

function mapStateToProps(state) {
    const { socket } = state.socket
    return { socket }
}

export default connect(mapStateToProps)(WrappedNormalLoginForm)