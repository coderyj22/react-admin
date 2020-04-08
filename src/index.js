import React from 'react'
import { render } from 'react-dom'
import App from './App'
import zhCN from 'antd/es/locale/zh_CN';
import './index.less'
import { ConfigProvider } from 'antd'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import store from './store'
import { Provider } from 'react-redux'

import { mainRoutes } from './routes'

render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path='/admin' component={App} />
          {
            mainRoutes.map(route => {
              return <Route key={route.pathname} path={route.pathname} component={route.component} />
            })
          }
          <Redirect to='/admin' from='/' exact />
          <Redirect to='/404' />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.querySelector('#root')
)
