import React, { Component } from 'react'
import {Button,Pagination} from 'antd'

const testHOC = (WrapperComponent) => {
  return class HOCComponent extends Component{
    render(){
      return (
        <>
          <WrapperComponent/>
          <div>
            这是高阶组件
          </div>
        </>
      )
    }
  }
}
@testHOC
class App extends Component {
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

export default App
