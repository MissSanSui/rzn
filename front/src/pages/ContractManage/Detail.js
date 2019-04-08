import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import styles from './Detail.less';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber,
  Row, Col, Radio, Icon, Modal, Tooltip, message, Switch
} from 'antd';

import formsStyles from '../Forms/style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects[''],
}))
@Form.create()

class AddUser extends PureComponent {
  state = { size: 'default', };
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contract/add',
      payload: {
        params: fields,
      },
      success: () => {
        message.success('配置成功');
        console.log("this.props===", this.props)
        this.props.onCancel();
        this.props.onSearch()
      },
      fail: (res) => {
        console.log("fail====", res)
        message.error('添加失败！');
      },
    });
  };
  handleUpdate = fields => {
    const { dispatch, modifyUser } = this.props;
    fields.user_id = modifyUser.user_id
    fields.user_status = fields.status ? "open" : "close"
    dispatch({
      type: 'contract/update',
      payload: {
        params: fields
      },
      success: () => {
        message.success('修改成功！');
        console.log("this.props===", this.props)
        this.props.onCancel();
        this.props.onSearch()
      },
      fail: (res) => {
        console.log("fail====", res)
        message.error('修改失败！');
      },
    });
  };
  onUsenameValidate = (rule, value, callback) => {
    const { dispatch, modifyUser, type } = this.props;
    if (!value) {
      callback()
    } else if (type == "modify" && modifyUser.user_name == value) {
      callback()
    } else {
      console.log(":validate===")
      dispatch({
        type: 'contract/validate',
        payload: {
          user_name: value
        },
        callback: (status) => {
          if (!status) {
            callback("重复！")
          } else {
            callback()
          }
        },
      });
    }
  }

  okHandle = () => {
    const { form, type } = this.props
    form.validateFields((err, fieldsValue) => {
      console.log("fieldsValue===", fieldsValue)
      if (err) return;
      if (fieldsValue.citys && fieldsValue.citys.length == 3) {
        fieldsValue.province = fieldsValue.citys[0]
        fieldsValue.city = fieldsValue.citys[1]
        fieldsValue.county = fieldsValue.citys[2]
      }
      if (type == "add") {
        this.handleAdd(fieldsValue);
      } else {
        this.handleUpdate(fieldsValue);
      }
    });
  };
  render() {
    const { size } = this.state;
    const { submitting, modalVisible, onCancel, type } = this.props;
    let modifyUser = this.props.modifyUser || {}
    // console.log("modifyUser===", modifyUser)
    if (type == "add") {
      modifyUser = {}
    }
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    let title = "添加用户"
    if (type != "add") {
      title = "修改用户"
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutOne = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Modal
        destroyOnClose
        title={title}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.props.onCancel}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark={false} style={{ marginTop: 8 }}>
          {/* 姓名 */}
          <Row >
            <Col span={12}>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.name" />}>
                {getFieldDecorator('emp_name', {
                  initialValue: modifyUser.emp_name,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.name.required' }),
                    },
                  ],
                })(<Input placeholder={formatMessage({ id: 'form.name' })} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="邮箱">
                {getFieldDecorator('email', {
                  initialValue: modifyUser.email,
                  rules: [
                    {
                      required: false,
                      message: "请输入邮箱",
                    },
                    {
                      type: "email",
                      message: "请输入正确的邮箱地址",
                    },
                  ],
                })(<Input placeholder="邮箱" />)}
              </FormItem>
            </Col>
            <Col span={12}>
                <FormItem {...formItemLayout} label="兴趣">
                  {getFieldDecorator('interests', {
                    initialValue: modifyUser.interests,
                    rules: [
                      {
                        required: false,
                        message: "请输入兴趣",
                      },
                    ],
                  })(<Input placeholder="兴趣" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="擅长">
                  {getFieldDecorator('good', {
                    initialValue: modifyUser.good,
                    rules: [
                      {
                        required: false,
                        message: "请输入擅长",
                      },
                    ],
                  })(<Input placeholder="擅长" />)}
                </FormItem>
              </Col>
          </Row>
        </Form>
      </Modal >
        )
      }
    }
    
export default AddUser;