import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import logo from './logo1.png'
import './Frame.less'
import { adminRoutes } from '../../routes'
import Icon from '@ant-design/icons';
// import { DashboardOutlined,UnorderedListOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout

const menu = adminRoutes.filter(item => item.isNav === true)

// console.log(menu);

@withRouter
class Frame extends Component {

  handleClickMenu = ({ key }) => {
    this.props.history.push(key)
  }

  render() {
    return (
      <Layout style={{height:'100%'}}>
        <Header className="header yj-header">
          <div className="yj-logo" >
            <img src={logo} alt="YJ ADMIN" />
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={this.props.history.location.pathname}
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleClickMenu}
            >
              {
                menu.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <Icon component={item.icon} ></Icon>
                      {item.title}
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor:'#fff'
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame
