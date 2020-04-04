import {
  DashBoard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  Edit
} from '../views'

export const mainRouter = [
  {
    pathname: '/login',
    component: Login
  },
  {
    pathname: '/404',
    component: NotFound
  }
]

export const adminRouter = [
  {
    pathname: '/admin/dashboard',
    component: DashBoard
  },
  {
    pathname: '/admin/settings',
    component: Settings
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true
  },
  {
    pathname: '/admin/article/edit/:id',
    component: Edit
  }
]
