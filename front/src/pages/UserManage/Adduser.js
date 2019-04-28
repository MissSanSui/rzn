import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import styles from './Adduser.less';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber,
  Row, Col, Radio, Icon, Modal, Tooltip, message, Switch
} from 'antd';
import CitySelect from '@/components/CitiySelect/CitySelect';

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
    fields.user_status = fields.status ? "open" : "close"
    dispatch({
      type: 'userManage/add',
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
      type: 'userManage/update',
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
        type: 'userManage/validate',
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

    const Option = Select.Option;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
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
              <FormItem {...formItemLayout} label="性别">
                {getFieldDecorator('sex', {
                  initialValue: modifyUser.sex,
                  rules: [
                    {
                      required: true,
                      message: "选择性别",
                    },
                  ],
                })(<Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="请选择性别"
                >
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>)}
              </FormItem>
            </Col>
            {/* 登录名 */}
            <Col span={12}>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.account" />}>
                {getFieldDecorator('user_name', {
                  initialValue: modifyUser.user_name,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.account.required' }),
                    },
                    {
                      validator: this.onUsenameValidate
                    }
                  ],
                })(<Input placeholder={'登录名只能为字母和数字'} onBlur={this.onUserNameBlur} />)}
              </FormItem>
            </Col>
            {/* 密码 */}
            {/* <Col span={12}>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.passwd" />}>
                {getFieldDecorator('password', {
                  initialValue: modifyUser.password,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.passwd.required' }),
                    },
                  ],
                })(<Input placeholder={formatMessage({ id: 'form.passwd' })} />)}
              </FormItem>
            </Col> */}
            {/* 角色 */}
            <Col span={12}>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.role" />}>
                {getFieldDecorator('role', {
                  initialValue: modifyUser.role,
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.role.required' }),
                    },
                  ],
                })(<Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="请选择角色"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="STU">学生</Option>
                  <Option value="TEA">教师</Option>
                  <Option value="PAR">家长</Option>
                  <Option value="ASS">助教</Option>
                  <Option value="SYS">管理员</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="联系电话">
                {getFieldDecorator('mobile', {
                  initialValue: modifyUser.mobile,
                  rules: [
                    {
                      required: true,
                      message: "请输入联系电话",
                    },
                  ],
                })(<Input placeholder="联系电话" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="身份证号">
                {getFieldDecorator('id_card', {
                  initialValue: modifyUser.id_card,
                  rules: [
                    {
                      required: false,
                      message: "请输入身份证号",
                    },
                  ],
                })(<Input placeholder="身份证号" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem   {...formItemLayout} label="生日">
                {getFieldDecorator('birth',
                  {
                    initialValue: modifyUser.birth,
                    rules: [{ type: 'object', required: false, message: 'Please select time!' }]
                  })(
                    <DatePicker />
                  )}
              </FormItem>
            </Col>
            <Col span={0}>
              <FormItem  {...formItemLayout} label="启用与否">
                {getFieldDecorator('status', {
                  initialValue: modifyUser.user_status == "open",
                  valuePropName: 'checked'
                })(
                  <Switch />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayoutOne} label="城市">
                {getFieldDecorator('citys', {
                  initialValue: [modifyUser.province, modifyUser.city, modifyUser.county,],
                  rules: [
                    {
                      required: false,
                      message: "请选择省份",
                    },
                  ],
                })(<CitySelect placeholder="选择城市" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayoutOne} label="地址">
                {getFieldDecorator('address', {
                  initialValue: modifyUser.address,
                  rules: [
                    {
                      required: false,
                      message: "请输入地址",
                    },
                  ],
                })(<Input placeholder="地址" />)}
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
              <Col span={0}>
                {/* 报名老师 */}
                <FormItem {...formItemLayout} label={<FormattedMessage id="form.teachers" />}>
                  <Select
                    mode="multiple"
                    size={size}
                    placeholder="请选择老师"
                    defaultValue={['a10', 'c12']}
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
                </FormItem>
              </Col>
          </Row>
        </Form>
      </Modal >
        )
      }
    }
    
export default AddUser;