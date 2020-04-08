import React, { Component, createRef } from 'react'
import { Card, Button, Form, Input, DatePicker, Spin, message } from 'antd'
import { getArticleById, saveArticle } from '../../network'
import './Edit.less'
import moment from 'moment'

import E from 'wangeditor'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const initialValues = {
  title: '标题',
  author: 'author',
  amount: '0',
}

export default class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spinning: true,
      articleData: {
        id: null,
        title: '标题',
        author: '作者',
        amount: '阅读量',
        createAt: '发布时间',
        context: '内容'
      }
    }
    this.editorRef = createRef()
    this.formRef = createRef()
  }
  render() {
    const { spinning } = this.state
    return (
      <Card title="编辑文章" bordered={false} extra={<Button onClick={this.handleClickBack}>返回</Button>} style={{ minHeight: '100%' }}>
        <Spin spinning={spinning}>
          <Form
            ref={this.formRef}
            {...formItemLayout}
            onFinish={this.handleOnFinish}
            onFinishFailed={this.handleOnFinishFailed}
            initialValues={initialValues}
          >
            <Form.Item
              name='title'
              label="标题"
              rules={[
                {
                  required: true, message: '标题是必填的'
                }
              ]}
            >
              <Input placeholder='标题' />
            </Form.Item>
            <Form.Item
              name='author'
              label="作者"
              rules={[
                {
                  required: true,
                  message: '作者是必填的'
                },
                {
                  max: 8,
                  message: '最长不能超过8位'
                }
              ]}
            >
              <Input placeholder='author' />
            </Form.Item>
            <Form.Item
              name="amount"
              label="阅读量"
              rules={[
                {
                  required: true,
                  message: '阅读量是必填的'
                }
              ]}
            >
              <Input placeholder='0' />
            </Form.Item>
            <Form.Item
              name="createAt"
              label="发布时间"
              rules={[
                {
                  required: true,
                  message: '发布时间是必填的'
                }
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              name="content"
              label="内容"
              rules={[
                {
                  min: 10,
                  message: '内容需要大于10个字'
                }
              ]}
            >
              <div ref={this.editorRef} className='content-editor' />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 4 }}
            >
              <Button type='primary' htmlType='submit'>保存修改</Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
  // 刷新了页面，将回退到article页面
  // componentWillMount() {
  //   if (!this.props.location.data) {
  //     this.props.history.push('/admin/article')
  //   }
  // }

  componentDidMount() {

    this.initEditor()

    getArticleById(this.props.location.data)
      .then(res => {
        console.log(res)
        this.setState({
          spinning: false,
          articleData: res
        }, () => {
          const { articleData } = this.state
          this.formRef.current.setFieldsValue({
            title: articleData.title,
            author: articleData.author,
            amount: articleData.amount,
            createAt: moment(articleData.createAt),
            content: articleData.content
          })
          this.editor.txt.html(articleData.content)
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        console.log(err)
      })
  }

  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = html => {
      // html 即变化之后的内容
      this.formRef.current.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }

  handleClickBack = () => {
    this.props.history.push('/admin/article')
  }

  // 表单验证成功的回调
  handleOnFinish = (data) => {
    this.setState({
      spinning: true
    })
    const createAt = data.createAt
    const value = Object.assign({}, data, {
      createAt: moment(createAt).valueOf()
    })
    // console.log(value)

    saveArticle(this.state.articleData.id, value)
      .then(res => {
        console.log(res)
        this.setState({
          spinning: false
        })
        message.success('保存成功')
        this.props.history.push('/admin/article')
      })
      .catch(err => {
        this.setState({
          spinning: false
        })
        message.error('保存失败')
        console.log(err)
      })

  }

  // 表单验证失败的回调
  handleOnFinishFailed = (err) => {
    // console.log(err)
  }


}
