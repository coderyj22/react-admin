import { DashboardOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';

import {
  DashBoard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  Edit
} from '../views'

export const mainRoutes = [
  {
    pathname: '/login',
    component: Login
  },
  {
    pathname: '/404',
    component: NotFound
  }
]

export const adminRoutes = [
  {
    pathname: '/admin/dashboard',
    component: DashBoard,
    title: '仪表盘',
    isNav: true,
    icon: DashboardOutlined
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    isNav: true,
    exact: true,
    icon: UnorderedListOutlined
  },
  {
    pathname: '/admin/article/edit/:id',
    component: Edit
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    icon: SettingOutlined
  }
]
