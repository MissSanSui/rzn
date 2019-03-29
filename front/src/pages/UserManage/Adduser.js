import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import styles from './Adduser.less';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Modal, Tooltip, message, } from 'antd';
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

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        dispatch({
          type: 'usermanage/addUser',
          payload: values,
        });
      }
    });
  };
  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'userManage/update',
      payload: {
        query: formValues,
        body: {
          name: fields.name,
          desc: fields.desc,
          key: fields.key,
        },
      },
    });
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  constructor(props) {
    super(props);
    this.state = {
      room: null
    }
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };
  okHandle = () => {
    const { form } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      this.handleAdd(fieldsValue);
    });
  };
  render() {
    const { size } = this.state;
    const { submitting, modalVisible, onCancel, type } = this.props;
    let modifyUser = this.props.modifyUser || {}
    if (type == "add") {
      modifyUser = {}
    }
    console.log("this.props.modifyUser===", this.props.modifyUser)
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
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const Option = Select.Option;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
      console.log(`selected ${value}`);
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
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.name" />}>
              {getFieldDecorator('name', {
                initialValue: modifyUser.name,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.name.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.name' })} />)}
            </FormItem>
            {/* 登录名 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.account" />}>
              {getFieldDecorator('account', {
                initialValue: modifyUser.account,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.account.required' }),
                  },
                ],
              })(<Input placeholder={'登录名只能为字母和数字'} />)}
            </FormItem>

            {/* 密码 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.passwd" />}>
              {getFieldDecorator('passwd', {
                initialValue: modifyUser.password,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.passwd.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.passwd' })} />)}
            </FormItem>

            {/* 角色 */}
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
                style={{ width: 200 }}
                placeholder="请选择角色"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="STU">学生</Option>
                <Option value="TEA">教师</Option>
                <Option value="PAR">家长</Option>
                <Option value="ASS">助教</Option>
                <Option value="SYS">负责人</Option>
                <Option value="LEA">管理员</Option>
              </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系电话">
              {getFieldDecorator('telephone', {
                initialValue: modifyUser.telephone,
                rules: [
                  {
                    required: true,
                    message: "请输入联系电话",
                  },
                ],
              })(<Input placeholder="联系电话" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="省份">
              {getFieldDecorator('province', {
                initialValue: modifyUser.province,
                rules: [
                  {
                    required: false,
                    message: "请输入省份",
                  },
                ],
              })(<Input placeholder="省份" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="城市">
              {getFieldDecorator('city', {
                initialValue: modifyUser.city,
                rules: [
                  {
                    required: false,
                    message: "请输入城市",
                  },
                ],
              })(<Input placeholder="城市" />)}
            </FormItem>
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
            {/* 报名老师 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.teachers" />}>
              <Select
                mode="multiple"
                size={size}
                placeholder="请选择老师"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                {children}
              </Select>
            </FormItem>
          </Form>
      </Modal>
    )
  }
}

export default AddUser;