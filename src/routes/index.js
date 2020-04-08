import { DashboardOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';

import {
  DashBoard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  Edit,
  Notifications,
  NoAuth
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
    icon: DashboardOutlined,
    roles:['001','002','003']
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    isNav: true,
    exact: true,
    icon: UnorderedListOutlined,
    roles:['001','002']
  },
  {
    pathname: '/admin/article/edit/:id',
    component: Edit,
    roles:['001','002']
  },
  {
    pathname: '/admin/notifications',
    component: Notifications,
    roles:['001','002','003']
  },
  {
    pathname: '/admin/NoAuth',
    component: NoAuth,
    roles:['001','002','003']
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    icon: SettingOutlined,
    roles:['001']
  }
]
