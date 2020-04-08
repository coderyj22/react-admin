import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import logo from './logo1.png'
import './Frame.less'
import { adminRoutes } from '../../routes'
import Icon, { DownOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'

import { getNotificationList } from '../../actions/notifications'

import { logout } from '../../actions/user'

const { Header, Content, Sider } = Layout

const menu = adminRoutes.filter(item => item.isNav === true)


const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}

@connect(mapState, { getNotificationList, logout })
@withRouter
class Frame extends Component {

  componentDidMount() {
    this.props.getNotificationList()
  }

  handleClickMenu = ({ key }) => {
    this.props.history.push(key)
  }

  onDropdownMenuClick = ({ key }) => {
    if(key === '/login'){
      this.props.logout()
    }
    this.props.history.push(key)
  }

  renderMenu = () => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item
        key='/admin/notifications'
      >
        <Badge dot={Boolean(this.props.notificationsCount)}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item
        key='/admin/settings'
      >
        个人设置
      </Menu.Item>
      <Menu.Item
        key='/login'
      >
        退出
      </Menu.Item>
    </Menu>
  )
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="header yj-header">
          <div className="yj-logo" >
            <img src={logo} alt="YJ ADMIN" />
          </div>
          <div className='user-info'>
            <Dropdown overlay={this.renderMenu()} trigger={['click']}>
              <div className="ant-dropdown-link" style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={this.props.avatar} />
                <span style={{ margin: '0 7px' }}>欢迎您 ,&nbsp; {this.props.displayName}</span>
                <DownOutlined />
                <Badge count={this.props.notificationsCount} offset={[-30, -25]} />
              </div>
            </Dropdown>
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
                margin: 0,
                minHeight: 280,
                backgroundColor: '#fff'
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
