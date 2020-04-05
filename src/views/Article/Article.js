import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd'
import { getArticles } from '../../network'
import moment from 'moment'


const titleDisplayMap = {
  "id": "编号",
  "title": "标题",
  "author": "作者",
  "amount": "阅读量",
  "createAt": "创建时间"
}

window.moment = moment

export default class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false
    }
  }
  componentDidMount() {
    this._getArticles()
  }

  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          key: item,
          title: titleDisplayMap[item],
          render: (text) => {
            const { amount } = text
            return (
              <div>
                <Tag color={amount > 200 ? 'red' : 'blue'}>{amount}</Tag>
              </div>
            )
          }
        }
      }
      if (item === 'createAt') {
        return {
          key: item,
          title: titleDisplayMap[item],
          render: (text) => {
            const { createAt } = text
            return (
              <div>
                {
                  moment(createAt).format('YYYY年 MM月 DD日 HH:MM:SS')
                }
              </div>
            )
          }
        }
      }
      return {
        key: item,
        title: titleDisplayMap[item],
        dataIndex: item
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: () => {
        return (
          <div>
            <Button type='primary'>编辑</Button>
            <Button type="danger" style={{ marginLeft: '10px' }}>删除</Button>
          </div>
        )
      }
    })
    return columns
  }
  _getArticles() {
    this.setState({
      isLoading: true
    })
    getArticles()
      .then(res => {
        const columnKeys = Object.keys(res.list[0])
        const columns = this.createColumns(columnKeys)
        this.setState({
          total: res.total,
          columns,
          dataSource: res.list
        })
      })
      .catch(err => {
        throw err
      })
      .finally(() => {
        this.setState({
          isLoading:false
        })
      })
  }

  render() {
    return (
      <Card
        title='文章列表'
        extra={<Button>123</Button>}
        bordered={false}
      >
        <Table
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isLoading}
          pagination={{
            total: this.state.total
          }}
        />

      </Card>
    )
  }
}
