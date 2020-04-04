import React from 'react'
import {render} from 'react-dom'
import App from './App'
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd'

render(
  <ConfigProvider locale={zhCN}>
    <App/>
  </ConfigProvider>,
  document.querySelector('#root')
)
