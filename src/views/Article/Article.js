import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  message,
  Tooltip
} from 'antd'
import { getArticles, deleteArticle } from '../../network'
import moment from 'moment'
import XLSX from 'xlsx'


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
      isLoading: false,
      offset: 0,
      limited: 10,
      visible: false,    // modal框 的显示
      confirmLoading: false,
      currentData: null    // 当前要操作的数据
    }
  }


  render() {
    return (
      <Card
        title='文章列表'
        extra={<Button onClick={this.handleClickToExcel}>导出Excel</Button>}
        bordered={false}
      >
        <Table
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isLoading}
          pagination={{
            total: this.state.total,
            onChange: this.onPageChange,
            showQuickJumper: true,
            pageSize: 10,
            showSizeChanger: false
          }}
        />
        <Modal
          visible={this.state.visible}
          title='确认删除'
          onCancel={async () => {
            await this.setState({ visible: false, currentData: null })
          }}
          onOk={this.handleConfirmDelete}
          maskClosable={false}
          keyboard
          confirmLoading={this.state.confirmLoading}
        >
          <p>此操作不可逆, 请谨慎操作</p>
        </Modal>
      </Card>
    )
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
              <Tooltip placement='top' title={amount > 200 ? '阅读量超过200' : '阅读量小于200'}>
                <Tag color={amount > 200 ? 'red' : 'blue'}>{amount}</Tag>
              </Tooltip>
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
      render: (text) => {
        return (
          <div>
            <Button type='primary' onClick={this.toEdit.bind(this, text)}>编辑</Button>
            <Button type="danger" style={{ marginLeft: '10px' }} onClick={this.handleDeleteArticle.bind(this, text)}>删除</Button>
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
    getArticles(this.state.offset, this.state.limited)
      .then(res => {
        const columnKeys = Object.keys(res.list[0])
        const columns = this.createColumns(columnKeys)
        if(this.updater.isMounted(this)) return
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
        if(this.updater.isMounted(this)) return
        this.setState({
          isLoading: false
        })
      })
  }

  onPageChange = (page, pageSize) => {
    console.log(pageSize)
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this._getArticles()
    })
  }

  handleClickToExcel = () => {
    const data = [Object.keys(this.state.dataSource[0])]
    this.state.dataSource.forEach(item => {
      let { id, title, author, amount, createAt } = item
      createAt = moment(createAt).format('YYYY年 MM月 DD日 HH:MM:SS')
      data.push(Object.values({ id, title, author, amount, createAt }))
    })
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `articles-${moment().format('YYYY/MM/DD-HH-MM-SS')}.xlsx`)

  }

  // 点击删除按钮 显示Modal框
  handleDeleteArticle = (text) => {
    this.setState({
      visible: true,
      currentData: text
    })
  }

  // 点击 Modal框的 确认删除按钮
  handleConfirmDelete = (text) => {
    this.setState({
      confirmLoading: true  // 开启确认按钮的Loading效果
    })
    const { currentData } = this.state
    deleteArticle(currentData.id).then(res => {
      console.log(res)
      this.setState({
        visible: false,
        confirmLoading: false,
        currentData: null
      }, () => {
        this._getArticles()
        setTimeout(() => {
          message.success('成功删除文章!!!')
        }, 500)
      })
    })
  }

  toEdit = (text) => {
    this.props.history.push({
      pathname: `/admin/article/edit/${text.id}`,
      data: text.id
    })
  }
}
