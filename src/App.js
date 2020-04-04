import React, { Component } from 'react'
import {Button,Pagination} from 'antd'

export default class App extends Component {
  render() {
    return (
      <div>
        <Button loading type='primary'>asd</Button>
        <Pagination defaultCurrent={1} total={50} />
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
        
      </div>
    )
  }
}
