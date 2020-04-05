import loadable from '../common/js/util' 
// import loadable from './loadable'   // 自己封装的loadable懒加载

// import DashBoard from './DashBoard/DashBoard'
// import Login from './Login/Login'
// import NotFound from './NotFound/NotFound'
// import Settings from './Settings/Settings'
// import ArticleList from './Article/Article'
// import Edit from './Article/Edit'

// 路由懒加载的封装
const DashBoard = loadable(() => import('./DashBoard/DashBoard'))

const Login = loadable(() => import('./Login/Login'))

const NotFound = loadable(() => import('./NotFound/NotFound'))

const Settings = loadable(() => import('./Settings/Settings'))

const ArticleList = loadable(() => import('./Article/Article'))

const Edit = loadable(() => import('./Article/Edit'))





export {
  DashBoard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  Edit
}
