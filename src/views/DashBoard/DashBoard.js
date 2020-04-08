import React, { Component, createRef } from 'react'
import { Card, Row, Col } from 'antd'
import { getArticleAmount } from '../../network'
import echarts from 'echarts'

import './dashboard.less'
export default class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.articleAmount = createRef()
  }
  render() {
    return (
      <>
        <Card title='概览' bordered={false}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={6}><div className='gutter-box' style={{ backgroundColor: '#29b6f6' }}>col-6</div></Col>
            <Col span={6}><div className='gutter-box' style={{ backgroundColor: '#ab47bc' }}>col-6</div></Col>
            <Col span={6}><div className='gutter-box' style={{ backgroundColor: '#ff7043' }}>col-6</div></Col>
            <Col span={6}><div className='gutter-box' style={{ backgroundColor: '#43a047' }}>col-6</div></Col>
          </Row>
        </Card>
        <Card
          title='最近浏览量'
          bordered={false}>
          <div ref={this.articleAmount} style={{ height: '400px' }} />
        </Card>
      </>
    )
  }

  componentDidMount() {
    this.initArticleChart()
  }

  // 初始化echarts
  initArticleChart = () => {
    this.articleChart = echarts.init(this.articleAmount.current)
    getArticleAmount().then(res => {
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.amount.map(item => {
            return item.month
          })
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: res.amount.map(item => {
            return item.value
          }),
          type: 'line',
          areaStyle: {}
        }]
      };
      this.articleChart.setOption(option);
    })


  }
}
