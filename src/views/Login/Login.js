import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'

import './login.less'

const wrapperCol = {
  xs: {
    span: 24,
    offset: 0
  },
  md: {
    span: 24,
    offset: 0
  }
}

const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

@connect(mapState, { login })
class Login extends Component {
  render() {
    return (
      this.props.isLogin
        ?
        <Redirect to='/admin' />
        :
        <Card
          title='YJ ADMIN登陆'
          className='yj-login-wrapper'
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              wrapperCol={wrapperCol}
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入您的用户名!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                disabled={this.props.isLoading}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={wrapperCol}
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入您的密码!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', marginTop: '8px' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', float: 'right', marginTop: '8px' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={this.props.isLoading}
              >
                登陆
          </Button>
            </Form.Item>
          </Form>
        </Card>
    );
  }
  onFinish = async (values) => {
    this.props.login(values)
  };

}

export default Login
